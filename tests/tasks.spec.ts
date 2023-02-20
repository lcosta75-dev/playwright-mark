import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'


test('deve poder cadastrar uma nova tarefa', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'Ler um livro de TypeScript',
        is_done: false
    }

    await deleteTaskByHelper(request, task.name)

    const tasksPage: TasksPage = new TasksPage(page)

    await page.goto('http://localhost:3000')
    await tasksPage.create(task)
    await tasksPage.shouldHaveText(task.name)
})

test('não deve permitir tarefa duplicada', async ({ page, request }) => {
    const task: TaskModel = {
        name: 'Comprar Ketchup',
        is_done: false
    }

    await deleteTaskByHelper(request, task.name)
    await postTask(request, task)

    const tasksPage: TasksPage = new TasksPage(page)

    await page.goto('http://localhost:3000')
    await tasksPage.create(task)
    await tasksPage.alertHaveText('Task already exists!')
})

test('campo obrigatório', async ({ page }) => {
    const task: TaskModel = {
        name: '',
        is_done: false
    }
    const tasksPage: TasksPage = new TasksPage(page)

    await page.goto('http://localhost:3000')
    await tasksPage.create(task)

    //convertendo elemento para um objeto HTML
    const validationMessage = await tasksPage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
    expect(validationMessage).toEqual('This is a required field')
})