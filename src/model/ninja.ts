export class Ninja {
  private name: string = ''
  private office: string = ''
  private imgUrl: string = ''

  constructor (name: string, office: string, imgUrl: string) {
    this.name = name
    this.office = office
    this.imgUrl = imgUrl
  }

  public get getName (): string {
    return this.name
  }

  public get getOffice (): string {
    return this.office
  }

  public get getImgUrl (): string {
    return this.imgUrl
  }
}
