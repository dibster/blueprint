'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('app/index.html');
  });


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/view1");
  });


  describe('objects', function() {

    beforeEach(function() {
      browser().navigateTo('#/objects');
    });


    it('should render objects when user navigates to /objects', function() {
        input('user').enter('jacksparrow');
        expect(repeater('ul li').count()).toEqual(10);
        input('filterText').enter('Bees');
        expect(repeater('ul li').count()).toEqual(1)
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser().navigateTo('#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
});
