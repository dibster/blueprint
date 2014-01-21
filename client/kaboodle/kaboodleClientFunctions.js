/**
 * Created by dibster on 1/21/14.
 */

// Adds the Path to each dashboard record.

var myDashboardContents = function(projects) {

    // return object
    var dashboardRecs = {};
        dashboardRecs.myTaskList = [];
        dashboardRecs.myNewsList = [];
        dashboardRecs.myAssetList = [];

    var numberOfProjects = projects.length;

    for (var i = 0; i < numberOfProjects; i++) {
        // set breadcrumb for project
        var breadcrumb={} ;
        breadcrumb.Location = projects[i].Title;
        if (_.has(projects[i], "tasks")) {
            var numberOfTasks = projects[i].tasks.length;
            for (var j = 0; j < numberOfTasks; j++){
                var taskWithBreadcrumb = _.extend(breadcrumb,projects[i].tasks[j]);
                dashboardRecs.myTaskList.push(JSON.stringify(taskWithBreadcrumb));
            }
        }
        // news
        if (_.has(projects[i], "news")) {
            var numberOfNews = projects[i].news.length;
            for (var j = 0; j < numberOfNews; j++){
                var newsWithBreadcrumb = _.extend(breadcrumb,projects[i].news[j]);
                dashboardRecs.myNewsList.push(JSON.stringify(newsWithBreadcrumb));
            }
        }
        // assets
        if (_.has(projects[i], "assets")) {
            var numberOfAssets = projects[i].assets.length;
            for (var j = 0; j < numberOfAssets; j++){
                var assetWithBreadcrumb = _.extend(breadcrumb,projects[i].assets[j]);
                dashboardRecs.myAssetList.push(JSON.stringify(assetWithBreadcrumb));
            }
        }
    }
    return dashboardRecs;
}

