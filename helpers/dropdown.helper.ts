import { Locator, expect } from '@playwright/test';

export async function selectDropdownOption(
    triggerBtn: Locator,
    optionName: string,
): Promise<void> {
  await triggerBtn.page()
      .locator('[role="status"]')
      .waitFor({ state: 'hidden', timeout: 10000 });

  await expect(triggerBtn).toBeVisible();
  await triggerBtn.click();

  const menuId = await triggerBtn.getAttribute('aria-controls');
  const option = triggerBtn.page()
      .locator(`#${menuId}`)
      .getByRole('menuitemradio', { name: optionName, exact: true });

  await expect(option).toBeVisible();
  await option.click();

  await expect(triggerBtn).not.toHaveAttribute('aria-expanded', 'true');
  await expect(triggerBtn).toContainText(optionName);
}