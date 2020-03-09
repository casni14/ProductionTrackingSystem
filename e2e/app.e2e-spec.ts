import { ProductionTrackingWebPage } from './app.po';

describe('production-tracking-web App', () => {
  let page: ProductionTrackingWebPage;

  beforeEach(() => {
    page = new ProductionTrackingWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
