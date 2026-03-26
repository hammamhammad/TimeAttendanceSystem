import { test, expect } from '../../fixtures/base.fixture';
import { NfcTagsPage } from '../../pages/admin/nfc-tags.page';
import { uniqueName } from '../../fixtures/test-data';

test.describe('NFC Tags Management', () => {
  let nfcPage: NfcTagsPage;

  test.beforeEach(async ({ page }) => {
    nfcPage = new NfcTagsPage(page);
  });

  test('should display NFC tags list', async () => {
    await nfcPage.goto();
    await nfcPage.expectLoaded();
  });

  test('should navigate to create NFC tag form', async ({ page }) => {
    await nfcPage.goto();
    await nfcPage.clickCreate();
    await expect(page).toHaveURL(/nfc-tags\/(create|new)/);
  });

  test('should create a new NFC tag', async () => {
    await nfcPage.gotoCreate();
    await nfcPage.fillTagId(`NFC-${Date.now()}`);
    await nfcPage.fillLabel(uniqueName('NFC'));
    await nfcPage.selectBranch('Headquarters');
    await nfcPage.submit();
    await nfcPage.expectSuccess();
  });

  test('should view NFC tag details', async () => {
    await nfcPage.goto();
    if (await nfcPage.table.hasData()) {
      await nfcPage.table.clickView(0);
    }
  });

  test('should edit an NFC tag', async ({ page }) => {
    await nfcPage.goto();
    if (await nfcPage.table.hasData()) {
      await nfcPage.table.clickEdit(0);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/nfc-tags\/\d+\/edit/);
    }
  });
});
