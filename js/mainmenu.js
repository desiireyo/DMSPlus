function loadMenu() {
    var mastMenu = [],
        subMenu = [];
    $.ajax({
        type: "GET",
        url: "sqltext",
        contentType : "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        data: {sql: "SELECT A.MENUCODE, B.MENUNAME FROM USERMENU A, MAINMENU B WHERE A.MENUCODE = B.MENUCODE AND A.USERID = 'ADMIN' AND B.LEVAL = 1 AND ACTIVE = 'Y' AND SYSTEMCOD = 'DMSPlus' "}
    })
    .done(function(data) {
        mastMenu = data;
    });

    var icon = '';
    var htmlMenu = '<ul class="nav sidebar-menu"><li class="sidebar-label pt20">เมนูหลัก</li>';
    for (var i = 0; i < mastMenu.length; i++) {
        var menuCode = mastMenu[i].MENUCODE.trim();
        var menuName = mastMenu[i].MENUNAME.trim();
        var mainCode = menuCode.substring(0, menuCode.length-2);
        switch(mainCode) {
            case "STK": icon = 'glyphicons glyphicons-car'; break;
            case "SAL": icon = 'glyphicons glyphicons-shopping_cart'; break;
            case "FIN": icon = 'glyphicons glyphicons-usd'; break;
            case "AR": icon = 'glyphicons glyphicons-parents'; break;
            case "ADMIN": icon = 'glyphicons glyphicons-shield'; break;
        }
        htmlMenu += '<li><a class="accordion-toggle" href="#"><span class="'+icon+'"></span><span class="sidebar-title">'+menuName+'</span><span class="caret"></span></a>';
        $.ajax({
            type: "GET",
            url: "sqltext",
            contentType : "application/json;charset=utf-8",
            dataType: "json",
            async: false,
            data: {sql: "SELECT A.MENUCODE, B.MENUNAME FROM USERMENU A, MAINMENU B WHERE A.MENUCODE = B.MENUCODE AND A.MENUCODE LIKE '"+mainCode+"%' AND A.USERID = 'ADMIN' AND B.LEVAL = 2 AND ACTIVE = 'Y' AND SYSTEMCOD = 'DMSPlus' ORDER BY A.MENUCODE"},
            success: function(data, status, xhr) {
                subMenu = data;
                //console.log(subMenu);
                htmlMenu += '<ul class="nav sub-nav">';
                for (var i = 0; i < subMenu.length; i++) {
                    var subMenuCode = subMenu[i].MENUCODE.trim();
                    var subMenuName = subMenu[i].MENUNAME.trim();
                    htmlMenu += '<li id="'+subMenuCode+'"><a href="#">'+subMenuName+'</a></li>';
                };
                htmlMenu += '</ul></li>';
            },
            error: function(xhr, status, erro) {
                console.log(xhr.responseText);
            }
        });
    };

    htmlMenu += '<li class="sidebar-label pt20">รายงานระบบ</li><li class="sidebar-proj"><a href="#projectOne"><span class="fa fa-dot-circle-o text-primary"></span><span class="sidebar-title">รายงาน 1</span></a></li><li class="sidebar-proj"><a href="#projectTwo"><span class="fa fa-dot-circle-o text-info"></span><span class="sidebar-title">รายงาน 2</span></a></li><li class="sidebar-proj"><a href="#projectTwo"><span class="fa fa-dot-circle-o text-danger"></span><span class="sidebar-title">รายงาน 3</span></a></li><li class="sidebar-proj"><a href="#projectThree"><span class="fa fa-dot-circle-o text-warning"></span><span class="sidebar-title">รายงาน 4</span></a></li>';
    htmlMenu += '</ul>';
    //console.log(htmlMenu);
    $('#leftMenu').append(htmlMenu);
}
