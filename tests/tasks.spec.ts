import { test, expect } from '@playwright/test'

test('deve poder cadastrar uma nova tarefa', async ({ page }) => {
    await page.goto('http://192.168.0.136:3000')

    const inputTaskName = page.locator('input[class*=InputNewTask]')
    await inputTaskName.fill('Ler um livro de TypeScript')
    await page.click('css=button >> text=Create')
})