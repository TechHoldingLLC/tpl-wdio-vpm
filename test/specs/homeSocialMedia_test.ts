import homePage from "../pageobjects/home.page.js"
import { ChainablePromiseElement } from 'webdriverio'
import fs from 'fs'

describe('Home Page Footer- Social Media Link verification', () => {
    
    let pagetitle: any
    let originalWindowHandle: string

    before(async () => {
        await homePage.openHomepage()
        pagetitle = JSON.parse(fs.readFileSync('./test/data/pageTitles.json', 'utf-8'))
        originalWindowHandle = await browser.getWindowHandle()
    })

    afterEach(async () => {
        const windowHandles = await browser.getWindowHandles()
        const newWindowHandles = windowHandles.filter(handle => handle !== originalWindowHandle)
        for (const handle of newWindowHandles) {
            await browser.switchToWindow(handle)
            await browser.closeWindow()
        }
        await browser.switchToWindow(originalWindowHandle)
    })

    const verifySocialMediaRedirection = async (linkElement: ChainablePromiseElement<WebdriverIO.Element>, pageTitleKey: string, urlContains: string) => {
        await linkElement.scrollIntoView()
        await linkElement.click()

        const windowHandles = await browser.getWindowHandles()
        if (windowHandles.length < 2) {
            throw new Error(`${pageTitleKey} page did not open in a new window.`);
        }
        await browser.switchToWindow(windowHandles[1])
        
        await expect(browser).toHaveTitle(pagetitle[pageTitleKey])
        await expect(browser).toHaveUrl(expect.stringContaining(urlContains))
    }

    it("Verify FB Redirection Page", async () => {
        await verifySocialMediaRedirection(homePage.FBLink, 'pg_title_FB', 'facebook')
        expect(browser).toHaveUrl(expect.stringContaining('viapromeds'))
    })

    it("Verify Youtube Redirection Page", async () => {
        await verifySocialMediaRedirection(homePage.YouTubeLink, 'pg_title_YouTube', 'youtube')
        expect(browser).toHaveUrl(expect.stringContaining('viapromeds'))
    })
    
    it("Verify Instagram Redirection Page", async () => {
        await verifySocialMediaRedirection(homePage.InstaLink, 'pg_title_Instagram', 'instagram')
        expect(browser).toHaveUrl(expect.stringContaining('viapromeds'))
    })
})
