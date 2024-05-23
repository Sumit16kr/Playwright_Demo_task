import { test, expect,chromium } from '@playwright/test'

test.describe('Automation Testing Demo', () => {
  
test('TC001 -Positive scenario Test Cases', async ({ page }) => {
  
  // navigate to URL english
    await page.goto('https://todomvc.com/examples/react/dist/#/');
    
    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded'); 
    //Test Case 1- verify placeholder
    expect(await page.getByTestId('text-input').getAttribute('placeholder')).toBe('What needs to be done?')
    
    //Test Case 2-  Verify entered  todo item is added to the list
    await page.getByTestId('text-input').click();
    await page.getByTestId('text-input').fill('test1');
    await page.getByTestId('text-input').press('Enter');
    expect(await page.locator('.todo-count').textContent()).toBe('1 item left!')

    //Test Case 3-  Verify All is selected by defaults
    expect(await page.locator("//*[@data-testid='footer-navigation']//a[text()='All']").getAttribute('class')).toBe('selected')
    
    
    //Test Case 4- Fill multiple todo list items and verify items are updated  
    await page.getByTestId('text-input').click();
    await page.getByTestId('text-input').fill('test2');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('test3');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('test4');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('test5');
    await page.getByTestId('text-input').press('Enter');
    expect(await page.locator('.todo-count').textContent()).toBe('5 items left!')

  //Test Case 5- Verify complete toggle   
    await page.locator('div').filter({ hasText: 'test2' }).getByTestId('todo-item-toggle').check();
    expect(await page.locator('.todo-count').textContent()).toBe('4 items left!')
    expect(await page.locator("//*[@class='todo-list']/*[( contains(@class,'completed'))]").textContent()).toBe('test2')

    //Test Case 6- Verify Active tab  
    await page.locator("//*[@data-testid='footer-navigation']//a[text()='Active']").click()
    
    const eleCount = await page.$$("//*[@class='todo-list']//*[@data-testid='todo-item']")
    const elecountLen = eleCount.length as number;
    expect(elecountLen).toBe(4)
    expect(await page.locator('.todo-count').textContent()).toBe('4 items left!')

    //Test Case 7- Verify completed tab  

    await page.locator("//*[@data-testid='footer-navigation']//a[text()='Completed']").click()
    const eleCountComp = await page.$$("//*[@class='todo-list']//*[@data-testid='todo-item']")
    const elecountLenComp = eleCountComp.length as number;
    expect(elecountLenComp).toBe(1)
    expect(await page.locator("//*[@data-testid='todo-item-label']").textContent()).toBe('test2')

    //Test Case 8- Verify Clear completed feature  

    await page.getByRole('button', { name: 'Clear completed' }).click()
    await expect(page.getByTestId('todo-item-label')).toBeHidden();
    
    //Test Case 9- Verify Toggle all makes all task completed  
    await page.locator("//*[@data-testid='footer-navigation']//a[text()='All']").click()
    await page.getByTestId('toggle-all').check();
    expect(await page.locator('.todo-count').textContent()).toBe('0 items left!')



  })


  
test('TC002 - Negative Scenarios test cases', async ({ page }) => {
  
  // navigate to URL
    await page.goto('https://todomvc.com/examples/react/dist/#/');
    
    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded');        
     
    
    // fill data and enters
    await page.getByTestId('text-input').click();
    await page.getByTestId('text-input').fill('test1');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').click();
    await page.getByTestId('text-input').fill('test2');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('test3');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('test4');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('test5');
    await page.getByTestId('text-input').press('Enter');




    //Test case 1-Verify that completed task is not shown in active tab 
    await page.locator('div').filter({ hasText: 'test2' }).getByTestId('todo-item-toggle').check();
    await page.locator("//*[@data-testid='footer-navigation']//a[text()='Active']").click()
    expect(await page.getByText('test2')).not.toBeVisible()


  //Test case 2-Verify that completed task is not shown in active tab 
  await page.locator("//*[@data-testid='footer-navigation']//a[text()='Completed']").click()
  expect(await page.getByText('test1')).not.toBeVisible()

  //Test case 3-Verify that renaming, renames the task
  await page.locator("//*[@data-testid='footer-navigation']//a[text()='Active']").click()
  await page.getByText('test1', { exact: true }).click({clickCount:3});
  await page.getByTestId('todo-list').getByTestId('text-input').fill('new test');
  await page.getByTestId('todo-list').getByTestId('text-input').press('Enter');
  expect(await page.getByText('test1')).not.toBeVisible()


    //Test case 4-Verify that clearing completed task removes the footer section
    await page.locator("//*[@data-testid='footer-navigation']//a[text()='All']").click()
    await page.getByTestId('toggle-all').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect( page.locator("//*[@data-testid='footer']")).not.toBeVisible()

  })

})