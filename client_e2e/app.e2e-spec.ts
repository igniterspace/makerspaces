import { ClientappPage } from './app.po';

describe('clientapp App', function() {
  let page: ClientappPage;

  beforeEach(() => {
    page = new ClientappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
