import request from 'request-promise'
import cheerio, { CheerioAPI } from 'cheerio'
import { Ninja } from '../model/ninja'

export const getEmployees = async (
  nameQuery: any = '',
  sort: any = 'ASC',
  officeQuery: any = ''
) => {
  let employees: Ninja[] = []
  const URL: string = 'https://tretton37.com/meet'

  await request(URL, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)

      const info = $('.ninja-summary')
      info.each((i, data) => {
        const office = getOffice($, data)
        const name = getName($, data, office)
        const imgUrl = getImgUrl($, data)

        employees.push(new Ninja(name, office, imgUrl!))
      })
      if (nameQuery != '') {
        employees = filterByName(employees, nameQuery)
      }
      if (officeQuery != '') {
        employees = filterByOffice(employees, officeQuery)
      }
      if (sort == 'DESC') {
        employees.sort((e1, e2) => (e1.getName < e2.getName ? 1 : -1))
      }
    }
  })
  return employees
}

const filterByName = (ninjas: Ninja[], name: string): Ninja[] => {
  return ninjas.filter(ninja => {
    return ninja.getName.includes(name)
  })
}
const filterByOffice = (ninjas: Ninja[], office: string): Ninja[] => {
  return ninjas.filter(ninja => {
    return ninja.getOffice.includes(office)
  })
}

const getOffice = ($: CheerioAPI, data: any): string => {
  return $(data)
    .find('.contact-info')
    .find('h1')
    .find('a')
    .find('span')
    .text()!
}

const getName = ($: CheerioAPI, data: any, office: string): string => {
  return $(data)
    .find('.contact-info')
    .find('h1')
    .find('a')
    .text()
    .replace(office, '')!
}

const getImgUrl = ($: CheerioAPI, data: any): string => {
  return $(data)
    .find('a')
    .find('img')
    .attr('src')!
}
