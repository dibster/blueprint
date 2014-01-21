// get breadcrumbs

var records = [
    {
        "Title" : "Project 1",
        "description": "Default Project Object ...",
        "type" : "Project",
        "template" : true,
        "tasks" : [
            {"name" : "task1"},
            {"name" : "task2"},
            {"name" : "task3"},
            {"name" : "task4"},
            {"name" : "task5"},
            {"name" : "task6"},
            {"name" : "task7"},
            {"name" : "task8"}
        ],
        "news" : [
            {"name" : "news item1"},
            {"name" : "news item2"},
            {"name" : "news item3"},
            {"name" : "news item4"},
            {"name" : "news item5"},
            {"name" : "news item6"},
            {"name" : "news item7"},
            {"name" : "news item8"}
        ],
        "assets" : [
            {"name" : "asset 1"},
            {"name" : "asset 2"},
            {"name" : "asset 3"},
            {"name" : "asset 4"},
            {"name" : "asset 5"},
            {"name" : "asset 6"},
            {"name" : "asset 7"},
            {"name" : "asset 8"}
        ]
    },
    {
        "Title" : "Project 2",
        "description": "Default Project Object ...",
        "type" : "Project",
        "template" : true,
        "tasks" : [
            {"name" : "task11"},
            {"name" : "task12"},
            {"name" : "task13"},
            {"name" : "task14"},
            {"name" : "task511"},
            {"name" : "task16"},
            {"name" : "task17"},
            {"name" : "task18"}
        ]
    },
    {
        "Title" : "Project 3",
        "description": "Default Project Object ...",
        "type" : "Project",
        "template" : true,
        "tasks" : [
            {"name" : "task21"},
            {"name" : "task22"},
            {"name" : "task23"},
            {"name" : "task24"},
            {"name" : "task25"},
            {"name" : "task26"},
            {"name" : "task27"},
            {"name" : "task28"}
        ]
    }
    ]

    //console.log(records);

//    var MyTasks = _.compact(_.flatten(_.pluck(records,'tasks')));

    var myTaskList = [];
    var myNewsList = [];
    var myAssetList = [];

    var numberOfProjects = records.length;

    for (var i = 0; i < numberOfProjects; i++) {
        // set breadcrumb for project 
        var breadcrumb={} ;
        breadcrumb.Location = records[i].Title;
        
        var numberOfTasks = records[i].tasks.length;
        for (var j = 0; j < numberOfTasks; j++){
            var taskWithBreadcrumb = _.extend(breadcrumb,records[i].tasks[j]);
            myTaskList.push(JSON.stringify(taskWithBreadcrumb));
        }
        // tasks
        var numberOfNews = records[i].news.length;
        for (var j = 0; j < numberOfNews; j++){
            var newsWithBreadcrumb = _.extend(breadcrumb,records[i].news[j]);
            myNewsList.push(JSON.stringify(newsWithBreadcrumb));
        }
        // tasks
        var numberOfAssets = records[i].assets.length;
        for (var j = 0; j < numberOfAssets; j++){
            var assetWithBreadcrumb = _.extend(breadcrumb,records[i].assets[j]);
            myAssetList.push(JSON.stringify(assetWithBreadcrumb));
        }
    }
 c

    console.log(myTaskList);