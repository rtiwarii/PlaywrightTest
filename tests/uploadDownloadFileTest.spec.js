const ExcelObj = require('exceljs');
const {test, expect } = require('@playwright/test');

async function updateExcel(searchText, replaceText, change, filePth){

    const workBook = new ExcelObj.Workbook();
    await workBook.xlsx.readFile(filePth);
    const wroksheet = workBook.getWorksheet('Sheet1');
    const output = await readExcel(wroksheet,searchText)
    const cell = wroksheet.getCell(output.row, output.col+change.colChange);
    cell.value= replaceText;
    await workBook.xlsx.writeFile(filePth);
     
}

async function readExcel(wroksheet, searchText){

    let output = {row : -1, col : -1};
    wroksheet.eachRow((row, rowNumber) =>{
        row.eachCell((cell, colNumber) =>{
            if(cell.value === searchText){
                output.row=rowNumber;
                output.col=colNumber;
            }           
        })              
    })
    return output;

}




test('Download and Upload excel File to validate UI', async ({page}) =>{

    const searchText = 'Papaya';
    const updateText = '50';
    const filepath = "C:/Users/Rajnish/OneDrive/Documents/download.xlsx";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise = page.waitForEvent('download');
    
    await page.locator("//button[@id='downloadButton']").click();
    const download = await downloadPromise;
    await download.saveAs(filepath);
    updateExcel(searchText,updateText,{rowChange:0, colChange:2}, filepath);

    // await page.locator("//input[@id='fileinput']").click();
    await page.locator("//input[@id='fileinput']").setInputFiles(filepath);
    const searchTextLocator = page.locator("//div[text()='Papaya']");
    // await page.pause();
    const desiredRow = await page.getByRole('row').filter({has : searchTextLocator});
    await expect(desiredRow.locator("//div[@id='cell-4-undefined']/div")).toContainText(updateText);



})