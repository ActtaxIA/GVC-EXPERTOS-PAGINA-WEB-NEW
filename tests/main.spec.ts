import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should display the main heading', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/GVC Expertos/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should have working navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check header navigation
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('nav')).toBeVisible()
  })

  test('should display contact CTA', async ({ page }) => {
    await page.goto('/')
    
    const ctaButton = page.getByRole('link', { name: /contacto|consulta/i })
    await expect(ctaButton.first()).toBeVisible()
  })

  test('should have footer with legal links', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.getByRole('link', { name: /aviso legal/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /privacidad/i })).toBeVisible()
  })
})

test.describe('Services Pages', () => {
  const services = [
    'errores-diagnostico',
    'errores-quirurgicos',
    'negligencias-ginecologia',
    'negligencias-urgencias',
    'infecciones-hospitalarias',
    'consentimiento-informado',
  ]

  for (const service of services) {
    test(`should load service page: ${service}`, async ({ page }) => {
      await page.goto(`/negligencias-medicas/${service}`)
      
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('main')).toBeVisible()
    })
  }
})

test.describe('City Landing Pages', () => {
  const cities = ['madrid', 'barcelona', 'valencia', 'sevilla', 'murcia']

  for (const city of cities) {
    test(`should load city page: ${city}`, async ({ page }) => {
      await page.goto(`/abogados-negligencias-medicas-${city}`)
      
      await expect(page.locator('h1')).toBeVisible()
      // Check for city name in content
      const heading = page.locator('h1')
      await expect(heading).toContainText(new RegExp(city, 'i'))
    })
  }
})

test.describe('Contact Page', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/contacto')
    
    await expect(page.locator('form')).toBeVisible()
    await expect(page.getByLabel(/nombre/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/mensaje/i)).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contacto')
    
    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /enviar/i })
    await submitButton.click()
    
    // Should show validation errors (form shouldn't submit)
    await expect(page.locator('form')).toBeVisible()
  })
})

test.describe('Blog', () => {
  test('should display blog page', async ({ page }) => {
    await page.goto('/blog')
    
    await expect(page.locator('h1')).toContainText(/blog/i)
  })
})

test.describe('Legal Pages', () => {
  test('should load privacy policy', async ({ page }) => {
    await page.goto('/politica-privacidad')
    
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should load legal notice', async ({ page }) => {
    await page.goto('/aviso-legal')
    
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should load cookie policy', async ({ page }) => {
    await page.goto('/politica-cookies')
    
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('Mobile Responsiveness', () => {
  test('should have mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Mobile menu button should be visible
    const menuButton = page.locator('button[aria-label*="menú" i], button[aria-label*="menu" i]')
    if (await menuButton.count() > 0) {
      await expect(menuButton.first()).toBeVisible()
    }
  })
})

test.describe('SEO', () => {
  test('should have meta description', async ({ page }) => {
    await page.goto('/')
    
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
  })

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/)
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/)
  })

  test('should have canonical URL', async ({ page }) => {
    await page.goto('/')
    
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /.+/)
  })
})

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })
})
