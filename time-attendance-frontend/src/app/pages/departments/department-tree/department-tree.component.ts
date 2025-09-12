import { Component, signal, inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { DepartmentsService } from '../departments.service';
import { DepartmentDto, DepartmentTreeNode } from '../../../shared/models/department.model';
import { BranchDto } from '../../../shared/models/employee.model';

@Component({
  selector: 'app-department-tree',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-tree.component.html',
  styleUrls: ['./department-tree.component.css']
})
export class DepartmentTreeComponent implements OnInit {
  @Input() selectedBranchId?: number;
  @Input() allowSelection = true;
  @Input() allowEdit = true;
  @Input() allowDelete = true;
  @Input() showControls = true;
  @Output() departmentSelected = new EventEmitter<DepartmentDto>();
  @Output() departmentEdit = new EventEmitter<DepartmentDto>();
  @Output() departmentDelete = new EventEmitter<DepartmentDto>();
  @Output() departmentAdd = new EventEmitter<{ parentId?: number }>();

  public i18n = inject(I18nService);
  private departmentsService = inject(DepartmentsService);

  // Signals
  loading = signal(false);
  departments = signal<DepartmentTreeNode[]>([]);
  expandedNodes = signal<Set<number>>(new Set());
  selectedNode = signal<number | null>(null);
  searchTerm = signal('');
  showInactive = signal(false);

  ngOnInit() {
    this.loadDepartments();
  }

  async loadDepartments() {
    this.loading.set(true);
    
    try {
      const departments = await this.departmentsService.getDepartmentTree(this.selectedBranchId).toPromise();
      if (departments) {
        this.departments.set(this.convertToTreeNodes(departments));
      }
    } catch (error) {
      console.error('Failed to load departments:', error);
    } finally {
      this.loading.set(false);
    }
  }

  private convertToTreeNodes(departments: DepartmentDto[]): DepartmentTreeNode[] {
    return departments.map(dept => ({
      ...dept,
      expanded: false,
      selected: false,
      indentLevel: dept.level,
      children: dept.children ? this.convertToTreeNodes(dept.children) : []
    }));
  }

  toggleNode(nodeId: number) {
    const expanded = this.expandedNodes();
    if (expanded.has(nodeId)) {
      expanded.delete(nodeId);
    } else {
      expanded.add(nodeId);
    }
    this.expandedNodes.set(new Set(expanded));
  }

  selectNode(node: DepartmentTreeNode) {
    if (!this.allowSelection) return;
    
    this.selectedNode.set(node.id);
    this.departmentSelected.emit(node);
  }

  isExpanded(nodeId: number): boolean {
    return this.expandedNodes().has(nodeId);
  }

  isSelected(nodeId: number): boolean {
    return this.selectedNode() === nodeId;
  }

  getVisibleNodes(): DepartmentTreeNode[] {
    const allNodes: DepartmentTreeNode[] = [];
    const searchTerm = this.searchTerm().toLowerCase();
    const showInactive = this.showInactive();
    
    const traverse = (nodes: DepartmentTreeNode[], level = 0) => {
      for (const node of nodes) {
        const matchesSearch = !searchTerm || 
          node.name.toLowerCase().includes(searchTerm) ||
          node.code.toLowerCase().includes(searchTerm) ||
          (node.nameAr && node.nameAr.toLowerCase().includes(searchTerm));
        
        const matchesActive = showInactive || node.isActive;
        
        if (matchesSearch && matchesActive) {
          allNodes.push({
            ...node,
            indentLevel: level
          });
        }
        
        if (node.children && this.isExpanded(node.id)) {
          traverse(node.children, level + 1);
        }
      }
    };
    
    traverse(this.departments());
    return allNodes;
  }

  expandAll() {
    const allIds = this.getAllNodeIds(this.departments());
    this.expandedNodes.set(new Set(allIds));
  }

  collapseAll() {
    this.expandedNodes.set(new Set());
  }

  private getAllNodeIds(nodes: DepartmentTreeNode[]): number[] {
    const ids: number[] = [];
    for (const node of nodes) {
      ids.push(node.id);
      if (node.children) {
        ids.push(...this.getAllNodeIds(node.children));
      }
    }
    return ids;
  }

  onAddDepartment(parentNode?: DepartmentTreeNode) {
    this.departmentAdd.emit({ parentId: parentNode?.id });
  }

  onEditDepartment(node: DepartmentTreeNode) {
    this.departmentEdit.emit(node);
  }

  onDeleteDepartment(node: DepartmentTreeNode) {
    this.departmentDelete.emit(node);
  }

  getIndentStyle(level: number | undefined): string {
    const indentLevel = level || 0;
    return `margin-left: ${indentLevel * 20}px`;
  }

  onSearchChange(term: string) {
    this.searchTerm.set(term);
    if (term) {
      // Expand nodes that match the search
      this.expandMatchingNodes();
    }
  }

  private expandMatchingNodes() {
    const searchTerm = this.searchTerm().toLowerCase();
    const expanded = new Set<number>();
    
    const findAndExpand = (nodes: DepartmentTreeNode[], parentIds: number[] = []) => {
      for (const node of nodes) {
        const matches = node.name.toLowerCase().includes(searchTerm) ||
          node.code.toLowerCase().includes(searchTerm) ||
          (node.nameAr && node.nameAr.toLowerCase().includes(searchTerm));
        
        if (matches) {
          // Expand all parent nodes
          parentIds.forEach(id => expanded.add(id));
        }
        
        if (node.children) {
          findAndExpand(node.children, [...parentIds, node.id]);
        }
      }
    };
    
    findAndExpand(this.departments());
    this.expandedNodes.set(expanded);
  }

  onShowInactiveChange(show: boolean) {
    this.showInactive.set(show);
  }

  refresh() {
    this.loadDepartments();
  }

  trackByNodeId(index: number, node: DepartmentTreeNode): number {
    return node.id;
  }
}