import { test, expect } from '@playwright/test'

test.describe('Admin Authentication', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/admin/login')
    
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /entrar|iniciar/i })).toBeVisible()
  })

  test('should redirect unauthenticated users from admin', async ({ page }) => {
    await page.goto('/admin')
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/admin\/login/)
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/admin/login')
    
    await page.fill('input[type="email"]', 'invalid@test.com')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    
    // Should show error message
    await expect(page.locator('text=/error|incorrectos|inválido/i')).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Admin Dashboard (Authenticated)', () => {
  // Note: These tests require authentication setup
  // You would typically use a test user or mock authentication
  
  test.skip('should display dashboard stats', async ({ page }) => {
    // TODO: Add authentication setup
    await page.goto('/admin')
    
    await expect(page.locator('h1')).toContainText(/dashboard/i)
  })
})
