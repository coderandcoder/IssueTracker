/**
 * Created by anandraj on 3/7/14.
 */
'use strict';


$(document).ready(function () {

    FastClick.attach(document.body); //includes fastclick.js


    if (localStorage.getItem("user_id") == '' || localStorage.getItem("user_id") == null || localStorage.getItem("user_id") == undefined) {
        login_form.load();
    } else {

        mm.load();
    }


//    var m = new Menu(document.querySelector('#arc'), { radius: 100 });
//    var app = document.querySelector('#app');
//    if (app.ontouchmove !== undefined) {
//        app.addEventListener('click', function () {
//            m.close();
//        });
//    } else {
//        app.addEventListener('scroll', function () {
//            m.close();
//        })
//    }

//    $('#sel_clients').change(function () {
//        var y = $(this).val();
//        c_issue_entry.getModules(y);
//    });


//    $("#login_submit").click(function () {
//        login_form.login();
//    });

    device_test();

});


//----------------custom functions-------------

function device_test() {

    var isMobile = {
        Android : function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry : function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS : function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera : function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows : function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any : function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if (isMobile.Android()) {
//        alert('Android');
        localStorage.os = "android";
    } else if (isMobile.iOS()) {
//        alert('iOS');
        localStorage.os = "ios";
    } else if (isMobile.Windows()) {
        localStorage.os = "windows";
    } else {
        localStorage.os = "others";
    }

    screen_test();

}

function screen_test() {

    var x = screen.width;
    var y = screen.height;
    //document.getElementById("demo").innerHTML=x;
//    alert(x);

    localStorage.screen_width = x;

//    alert(y);

    localStorage.screen_height = y;

}

function block() {
    $.blockUI({
        message: '<img src="images/loader1.gif" />',
        overlayCSS: { backgroundColor: '#269abc' }
    });
}

function unblock() {
    $.unblockUI({
//            onUnblock: function(){ alert('onUnblock'); }
    });
}

function search_array(valuename, key_name, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        var x = key_name;
        if (myArray[i].x === valuename) {
            return myArray[i];
        }
    }
}

function backdrop_dismiss() {
    //-------------removes bootstrap modal backdrop not disappearing bug----------------
//    $('#'+a).modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
}


//--- Time convert
function convert_time() {
    $('#btnConverttime').click(function() {
        var time = $("#txtmytime").val();
        var hrs = Number(time.match(/^(\d+)/)[1]);
        var mnts = Number(time.match(/:(\d+)/)[1]);
        var format = time.match(/\s(.*)$/)[1];
        if (format == "PM" && hrs < 12) hrs = hrs + 12;
        if (format == "AM" && hrs == 12) hrs = hrs - 12;
        var hours = hrs.toString();
        var minutes = mnts.toString();
        if (hrs < 10) hours = "0" + hours;
        if (mnts < 10) minutes = "0" + minutes;
        alert(hours + ":" + minutes);
    })
}



//------------------custom functions-------------


/*--------------------------------------------------------------------------------------------------------------------*/
//---------------------------------------------login_page_object----------------------------
var login_form;
login_form = {
    load: function () {
        $("#container").html(this.content());
        $("header").html(this.header);
        //$("footer").html(this.footer);
        unblock();
    },
    header: "<h4>Issue Tracker</h4>",
    content: function () {
        var login_template = $("#login_tmp").html();
        var login_page = Handlebars.compile(login_template);
        return login_page;
    },
    login: function () {
        var a = $("#uname").val();
        var b = $("#pword").val();
        var c = btoa(b);
        block();

        $.getJSON('http://182.73.141.106/Mobile/Tracker/Service1.svc/AuthenticateUser?UserName=' + a + '&Password=' + c, function (data) {
            login_form.process_data(data);
        });
    },

    process_data: function (data) {
        var x = data.d[0];
        if (x.UserID) {

            localStorage.setItem("user_id", x.UserID);
            localStorage.setItem("user_name", x.UserName);
            localStorage.setItem("user_c_id", x.ClientID);

            localStorage.setItem("user_r_id", x.RoleId);
            localStorage.setItem("user_cont_no", x.ContactNo);
            localStorage.setItem("user_email", x.EmailID);
            localStorage.setItem("page_no", 1);

            mm.load();

        } else {
            alert("Check Username and Password");
        }

    }
};

//---------------------------------------------main_menu_page_object----------------------------
var mm;
mm = {
    load: function () {
        $("#container").html(this.content);
        $("header").html(this.header);
//        $("footer").html(this.footer);
        this.set_events();
        unblock();
//        $.growlUI('Growl Notification', 'Have a nice day!');
    },
    header: "<h4>Main Menu</h4>",
//    footer: "<small>Copyright @ Vibrant</small>",
    content: function () {
        var mm_template = $("#mainmenu_tmp").html();
        var mm_page = Handlebars.compile(mm_template);
        return mm_page;
    },
    set_events: function () {

        $("#mm_0").click(function () {
            block();
            localStorage.page_no = 1;
//            cil_li.load();
            c_issue_entry.load();
        });
        $("#mm_1").click(function () {
            block();
            localStorage.page_no = 1;
            c_approve_list.load();
        });
        $("#mm_2").click(function () {
            block();
            localStorage.page_no = 1;
            cmp_assign_list.load();


        });
        $("#mm_3").click(function () {
            block();
            localStorage.page_no = 1;
            iss_clr_list.load();

        });
        $("#mm_4").click(function () {
            block();
            localStorage.page_no = 1;
            assign_stat_li.load();

        });
        $("#mm_5").click(function () {
            block();
            localStorage.page_no = 1;
            cli_admin_list.load();

        });

        $("#mm_6").click(function () {
            block();
//            localStorage.page_no = 1;
//            daily_act_list.load();
            d_act_report.load();
        });

        $("#mm_options_icon").click(function () {
//            $('#mm_modal').modal('hide');

            var x = confirm("Logout?");
            if (x) {

                localStorage.clear();
//-------------removes bootstrap modal backdrop not disappearing bug----------------
                $('#mm_modal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
                login_form.load();
            } else {
//                return false;
            }
        });


        $("#name_tag").html(localStorage.user_name); //----Username append to menu box model-------------


    }

};

//-----------------------------------------client_issues_list_object---------------------------------------
var cil_li;
cil_li = {

    load: function () {
//        localStorage.setItem("page_no", 1);
        this.get_data();
    },
    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Client Issues List</h4><img id='entry_img' class='entry_icons' src='images/newAdd_128.png'>",
    get_data: function () {
        $.getJSON('http://182.73.141.106/Mobile/Tracker/Service1.svc/ListMainPage?PageNO=' + localStorage.page_no + '&RowperPage=10&searchText=""&ClientID=' + localStorage.user_c_id + '&UserID=' + localStorage.user_id, function (data) {
            if (data.d.length > 0) {
                cil_li.content(data);
            }
            else {
                alert("End of List, Press Previous");
            }
        });
    },
    content: function (data) {
        var template = $("#cil_tmp").html();
        var page = Handlebars.compile(template);

        var context = data;
        var htmls = page(context);
        this.set_contents(htmls);
    },
    set_events: function () {
        $("#back_img").click(function () {
            mm.load();
        });
        $("#entry_img").click(function () {
            block();
            c_issue_entry.load();
        });

        $("#li_pre").click(function () {
            cil_li.list_prev();
        });

        $("#li_nex").click(function () {
            cil_li.list_next();
        });

        /* $("#entry_img").onmouseover(function () {
         $("#entry_img").attr('src','images/pencil_red.png');
         });
         $("#entry_img").onmouseout(function () {
         $("#entry_img").attr('src','images/pencil_red.png');
         });*/

        /*$('#entry_img').hover(function () {
         this.src = 'images/edit.png';
         }, function () {
         this.src = 'images/Row-128.png';
         });*/

        $("#li_search").click(function () {
            $("#sear_mod").modal('show');
            $('#sear_mod').on('shown.bs.modal', function (e) {
                $("#search_box").focus();
            })
        });


        c_issue_entry.cie_obj = [];
        c_issue_entry.cie_list_obj = [];
        c_issue_entry.cie_rend_obj = [];

        unblock();
    },
    set_contents: function (x) {
        $("#container").html(x);
        $("header").html(this.header);
        this.set_events();

    },
    get_sub_list: function (j) {
        block();
        $.getJSON('http://182.73.141.106/Mobile/Tracker/Service1.svc/ListByDetailID?IssueID=' + j, function (data) {
            cil_li.sub_list(data);
        });
    },
    sub_list: function (data) {
        var template = $("#sub_cil_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_sub(htmls);
    },
    set_sub: function (y) {
        $("#sub_list_modal").html(y);

        $('#sub_li_mod').modal('show');

        unblock();


    },
    list_prev: function () {
        if (localStorage.page_no <= 1) {
        } else {
            localStorage.page_no--;
            cil_li.load();
        }
    },

    list_next: function () {
//        alert($('#m_ul table').length);
        if ($('#m_ul table').length != 0) {
            if (localStorage.page_no >= 1) {
                localStorage.page_no++;
                cil_li.load();
            } else {
            }
        } else {
            alert("End of List, Press Previous");
        }
    },
    sear_data: function (data) {
        var s = data.d.length;

        if (s > 0) {
            cil_li.content(data);
//-------------removes bootstrap modal backdrop not disappearing bug----------------
            $('#sear_mod').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
        }
        else {
            alert("No items to display!");

        }
    },

    search: function () {
        localStorage.page_no=1;
        var s = $('#search_box').val();
        $.getJSON('http://182.73.141.106/Mobile/Tracker/Service1.svc/ListMainPage?PageNO=' + localStorage.page_no + '&RowperPage=10&searchText=' + s + '&ClientID=' + localStorage.user_c_id + '&UserID=' + localStorage.user_id, function (data) {
            cil_li.sear_data(data);


        });
    }
}


//---------------------------------------------client_issue_entry_page_object----------------------------
var c_issue_entry;
c_issue_entry = {
    cie_obj: new Array(),
    cie_list_obj: new Array(),
    cie_rend_obj: new Array(),
    load: function () {
        $("#container").html(this.content);
        $("header").html(this.header);
//        $("footer").html(this.footer);
        this.getClients();
        this.set_datetime();
        this.set_events();
        this.cie_obj = [];
        this.cie_list_obj = [];

    },
    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Client Issue Entry</h4><img id='list_img' class='entry_icons' src='images/listFlatWhite_128.png'>",
//    footer: "<small>Copyright @ Vibrant</small>",
    content: function () {
        var cie_template = $("#cie_tmp").html();
        var cie_page = Handlebars.compile(cie_template);
        return cie_page;
    },
    list_content: function () {
        var cie_template = $("#cie_tmp").html();
        var cie_page = Handlebars.compile(cie_template);
        return cie_page;
    },
    render_add_list: function () {

        var template = $("#cie_add_tmp").html();
        var page = Handlebars.compile(template);

//        var context = this.cie_obj;

        var data = {"d": ""};
        data.d = this.cie_rend_obj;
        var context = data;
        var htmls = page(context);

        $("#issues_ul").html(htmls);

        $("#sub_cie").click(function () {
            c_issue_entry.submit();
        });
        $("#can_cie").click(function () {
            cil_li.load();
        });
    },
    getClients: function () {

        $.getJSON('http://182.73.141.106/Mobile/Tracker/Service1.svc/ClientList?UserID=' + localStorage.user_id, function (data) {

            c_issue_entry.appendClients(data);
        });
    },
    add_list: function () {

        var a = $('#sel_clients').val();

        var b = $('#sel_module').val();

        var c = $('#sel_form').val();

        var d = $('#issue_date').val();

        var e = $('#desc').val();

        var f = $('#self:checked').length;


        var g = $('#sel_module :selected').text();

        var h = $('#sel_form :selected').text();

        var i = $('#sel_clients :selected').text();

        $('#desc').val("");


        if (a == null || b == null || c == null || d == null || e == null || a == '' || b == '' || c == '' || d == '' || e == '') {
            alert("Please fill in all the fields");
        } else {
            var rend_list_obj = {"CreatedDate": d, "IssueDescription": e, "ModuleName": g, "FormName": h};
//
//            var objj = {"CIssueID": 0, "IssuedBy": localStorage.user_id, "DepartmentID": 0, "IssueSubject": "NULL", "ContactNo": localStorage.user_cont_no, "EmailId": localStorage.user_email, "ClientAddressID": a, "CreatedBy": localStorage.user_id, "IssueDescription": e,"ClientName": a , "CilentID": localStorage.user_c_id, "Approvalflag": 0, "SNO": 1, "ModuleID": b, "FormID": c, "CompltIssueNo": 0, "SelfAssign": f, "AssignedTo": localStorage.user_id};

//            var obj = {"CreatedDate": d,"ClientName": i,"ModuleName": g,"FormName": h,"CIssueID": 0, "IssuedBy": localStorage.user_id, "DepartmentID": 0, "IssueSubject": "NULL", "ContactNo": localStorage.user_cont_no, "EmailID": localStorage.user_email, "ClientAddressID": localStorage.user_c_id, "ClientID": localStorage.user_c_id, "CreatedBy": localStorage.user_id, "IssueDescription": e, "ClientID": a, "Approvalflag": 0, "SNO": 1, "CreatedBy": localStorage.user_id, "ModuleID": b, "FormID": c, "CompltIssueNo": 0, "SelfAssign": f, "AssignedTo": localStorage.user_id};

//            var data = {"IssueID": localStorage.isid, "IssueDescription": e1, "ClientID": a1, "Approvalflag": 0, "SNO": 1, "CreatedBy": localStorage.UserID, "ModuleID": b1, "FormID": c1, "CompltIssueNo": 0, "SelfAssign": x, "AssignedTo": localStorage.UserID};

//            var single_obj ={"CIssueID":0,"IssuedBy":localStorage.user_id,"DepartmentID":0,"IssueSubject":"NULL","ContactNo":localStorage.user_cont_no,"EmailId":localStorage.user_email,"ClientAddressID":a,"ClientID":localStorage.user_c_id,"CreatedBy":localStorage.user_id,"IssueDescription":"NULL"};
            var single_obj = { "IssueID": 0, "CIssueID": null, "IssuedBy": localStorage.user_id, "ContactNo": localStorage.user_cont_no, "DepartmentID": 0, "IssueSubject": null, "ClientName": a, "CilentID": localStorage.user_c_id, "CreatedBy": localStorage.user_id };
            var list_obj = { "SelfAssign": f, "AssignedTo": localStorage.user_id, "IssueID": "", "IssueDescription": e, "CilentID": a, "Aaprovalflag": 0, "SNO": 0, "CreatedBy": localStorage.user_id, "ModuleID": b, "FormID": c, "CompltIssueNo": 0};


            this.push_obj(single_obj, list_obj, rend_list_obj);
        }
    },
    del_item: function (x) {
        var y = confirm("Confirm Delete?");
        if (y) {
            this.cie_list_obj.splice(x, 1);
            this.cie_obj.splice(x, 1);
            this.cie_rend_obj.splice(x, 1);

            if (this.cie_rend_obj.length == 0) {
                this.clr_sub();

            } else {
                this.render_add_list();
            }
        } else {
            return false;
        }

    },
    clr_sub: function () {

        var template = $("#cie_add_tmp").html();
        var page = Handlebars.compile(template);

//        var context = this.cie_obj;

        var data = {"d": ""};
        data.d = this.cie_rend_obj;
        var context = data;
        var htmls = page(context);

        $("#issues_ul").html(htmls);

        $("#sub_cie").click(function () {
            block();
            c_issue_entry.submit();
        });
        $("#can_cie").click(function () {
            cil_li.load();
        });

        $('#button_div').html("");


    },

    push_obj: function (single_obj, list_obj, rend_list_obj) {
        this.cie_obj.push(single_obj);
        this.cie_list_obj.push(list_obj);
        this.cie_rend_obj.push(rend_list_obj);
        this.render_add_list();
    },
    submit: function () {
        var list = JSON.stringify(this.cie_obj[0]);
        $.getJSON('http://182.73.141.106/Mobile/Tracker/Service1.svc/Create?objissue=' + list, function (data) {
            c_issue_entry.submit_return(data);
        });
    },
    submit_return: function (data) {
        var y = data.d;
        var x = this.cie_list_obj.length;
        for (var i = 0; i < x; i++) {
            this.cie_list_obj[i].IssueID = y;
            this.cie_list_obj[i].SNO=i+1;
        }
        var list = JSON.stringify(this.cie_list_obj);

        $.getJSON('http://182.73.141.106/Mobile/Tracker/Service1.svc/CreateDtl?objissueDtl=' + list, function (data) {
            if (data.d) {
                alert("Saved Successfully");
                localStorage.page_no = 1;
                cil_li.load();
            } else {
                alert("Failed to Save!");
            }
        });
    },

    set_datetime: function () {
        var a, b, c, d, e;
        a = new Date();
        b = a.getDate();
        c = a.getMonth() + 1;
        d = a.getFullYear();
        e = b + "/" + c + "/" + d;
        $("#issue_date").val(e);
//        $("#issue_date").pickadate({
//            min: new Date(2014,1,01),
//            max: new Date(2014,12,31),
//            min: -1,
//            format: 'dd mmm, yy',
//            formatSubmit: 'yyyy/mm/dd',
//            hiddenPrefix: 'prefix__',
//            hiddenSuffix: '__suffix'
//        });
    },
    set_events: function () {
        $("#back_img").click(function () {
            mm.load();
        });

        $('#sel_clients').change(function () {
            block();
            $('#sel_clients').blur();
            var y = $(this).val();
            $("#sel_form option").remove();
            c_issue_entry.getModules(y);
        });

        $('#sel_module').change(function () {
            block();
            $('#sel_module').blur();
            var y = $(this).val();
            c_issue_entry.getForms(y);
        });

        $('#sel_form').change(function () {
            $('#sel_form').blur();
            $('#desc').focus();
        });

        $("#add_cie").click(function () {
            c_issue_entry.add_list();
            //c_issue_entry.submit();
        });

        $("#list_img").click(function () {
            block();
            localStorage.page_no = 1;
            cil_li.load();
        });

//        unblock();
    },
    appendClients: function (data) {

        var x = data.d;

        x.unshift({"__type": "Service1.Client:#", "ClientID": "", "ClientName": "--SELECT--", "FormID": null, "FormName": null, "ModuleID": null, "ModuleName": null});

        if (x[0].ClientName) {
            var li = "";
            for (var i = 0; i < x.length; i++) {
                if (x != '' || x != null) {
                    li += '<option value="' + x[i].ClientID + '" >' + x[i].ClientName + '</option>';
                } else {
                    li += '<option value="" >No items</option>';
                }
            }
            $('#sel_clients').append(li).promise().done(function () {
                // $(this).selectmenu('refresh', true);
                unblock();
            });
        } else {
            alert('Error connecting to server');
        }
    },
    getModules: function () {


        var y = $('#sel_clients').val();

        $('#sel_module option').remove();
        $.get('http://182.73.141.106/Mobile/Tracker/Service1.svc/ListModuleName?clientId=' + y, function (data) {
            c_issue_entry.appendModules(data);
        });
    },

    appendModules: function (data) {
        var x = data.d;
        x.unshift({"__type": "Service1.Client:#", "ClientID": 0, "ClientName": null, "FormID": null, "FormName": null, "ModuleID": "", "ModuleName": "--SELECT--"});
        if (x[0].ModuleName) {

            var li = "";
            for (var i = 0; i < x.length; i++) {
                if (x != '' || x != null) {
                    li += '<option value="' + data.d[i].ModuleID + '" >' + data.d[i].ModuleName + '</option>';
                } else {
                    li += '<option value="" >No items</option>';
                }
            }
            $('#sel_module').append(li).promise().done(function () {
//                $(this).selectmenu('refresh', true);
                unblock();
            });
        } else {
            alert('Error connecting to server');
        }
    },
    getForms: function () {
        var j = $('#sel_module').val();

        $('#sel_form option').remove();
        $.get('http://182.73.141.106/Mobile/Tracker/Service1.svc/ListFormName?ModuleID=' + j, function (data) {
            c_issue_entry.appendForms(data);
        });
    },
    appendForms: function (data) {
        var x = data.d;
        x.unshift({"__type": "Service1.Client:#", "ClientID": 0, "ClientName": null, "FormID": "", "FormName": "--SELECT--", "ModuleID": null, "ModuleName": null});
        if (x[0].FormName) {
            var li = "";
            for (var i = 0; i < x.length; i++) {
                if (x != '' || x != null) {
                    li += '<option value="' + data.d[i].FormID + '" >' + data.d[i].FormName + '</option>';

                } else {
                    li += '<option value="" >No items</option>';
                }
            }

            $('#sel_form').append(li).promise().done(function () {

//                $(this).selectmenu('refresh', true);
                unblock();
            });

        } else {
            alert('Error connecting to server');
        }
    }
};

/*//-----------------------------------------sample_load---------------------------------------
 var sample_li;
 sample_li = {

 load: function () {
 localStorage.setItem("page_no", 1);
 this.get_data();
 },
 header: "<h4>Sample list</h4>",
 get_data: function () {
 $.getJSON('http://182.73.141.106/Mobile/Tracker/Service1.svc/ListMainPage?PageNO=' + localStorage.page_no + '&RowperPage=10&searchText=""&ClientID=' + localStorage.user_c_id + '&UserID=' + localStorage.user_id, function (data) {
 sample_li.content(data);
 });
 },
 content: function (data) {
 var template = $("#sample_tmp").html();
 var page = Handlebars.compile(template);

 var context = data;
 var htmls = page(context);
 this.set_contents(htmls);
 },
 set_events: function () {
 $("#back_img").click(function () {
 mm.load();
 });
 $("#entry_img").click(function () {
 mm.load();
 });
 },
 set_contents: function (x) {
 $("#container").html(x);
 $("header").html(this.header);
 this.set_events();
 }
 }*/

//---------------------------------------------complaint_approval list----------------------------------------

var c_approve_list;
c_approve_list = {

    sub_list_array: new Array(),
    sub_new_array: new Array(),
    load: function () {
        this.get_data();
    },
    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Complaint Approval List</h4>",
    get_data: function () {
        var a, b, c, d, g, tdate, fdate;
        a = new Date();
        b = a.getDate();
        c = a.getMonth() + 1;
        d = a.getFullYear();
        g = d - 1;
        tdate = b + "/" + c + "/" + d;
        fdate = b + "/" + c + "/" + g;

        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ComplaintApprovalService.svc/SearchList?PageNo=' + localStorage.page_no + '&RowsPerPage=10&SearchText=""&ToDate=' + tdate + '&FromDate=' + fdate, function (data) {
            // c_approve_list.content(data);
            if (data.d.length > 0) {
                c_approve_list.content(data);
            }
            else {
                alert("End of List, Press Previous");
            }
        });
    },
    content: function (data) {
        var template = $("#ca_li_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_contents(htmls);
    },
    set_contents: function (x) {
        $("#container").html(x);
        $("header").html(this.header);
        this.set_events();
    },
    set_events: function () {
        $("#back_img").click(function () {
            mm.load();
        });

        $("#li_pre").click(function () {
            c_approve_list.list_prev();
        });

        $("#li_nex").click(function () {
            c_approve_list.list_next();
        });

        $("#ca_approve_but").click(function () {
            block();
            c_approve_list.approve();
        });
        $("#ca_cancel_but").click(function () {

            $('#sub_li_mod').modal('hide');
            this.sub_list_array = [];
        });
        $("#li_search").click(function () {
            $("#sear_mod").modal('show');
            $('#sear_mod').on('shown.bs.modal', function (e) {
                $("#search_box").focus();
            })
        });

        //-------------removes bootstrap modal backdrop not disappearing bug----------------
        // $('#mm_modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----

        unblock();

    },
    get_sub_list: function (j) {
        block();
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ComplaintApprovalService.svc/ListGrid?objissueDtlID=' + j, function (data) {
            c_approve_list.sub_list(data);
        });
    },
    sub_list: function (data) {
        var template = $("#sub_ca_list_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_sub(htmls);
        var z = data.d;
        this.sub_list_array = z;
    },
    set_sub: function (y) {
        $("#sub_list_modal").html(y);
        $('#sub_li_mod').modal('show');
//        $('.true').css('background-color','red');
//        $('.true').css('background','#269abc');
//        var tag = '';
//        $('.true').append();

        $(".true .row .col-xs-1 label .y").prop("disabled", true);
        $(".true .row .col-xs-1 label").removeClass("btn-primary");
        $(".true .row .col-xs-1 label").addClass("btn-success");
        unblock();
    },
    check_box_click: function (x, y) {

        for (var i = 0; i < this.sub_list_array.length; i++) {
            if (x == this.sub_list_array[i].IssueDetailID) {
//                    var obj = {"IssueDetailID": x, "ClientIssueNo": y, "ApproveFlag": 0, "OverAllPriority": "high"};

                if (this.sub_list_array[i].ApproveFlag == 1) {
//                        alert("Test flag"+ this.sub_list_array[i].ApproveFlag);
                    this.sub_list_array[i].ApproveFlag = 0;

//                        alert(this.sub_list_array[i].ApproveFlag);
//                        alert(this.sub_list_array[i].ClientIssueNo);
                } else {
                    this.sub_list_array[i].ApproveFlag = 1;

                    this.sub_list_array[i].ClientIssueNo = y;
//                        alert("inside else"+this.sub_list_array[i].ApproveFlag);
//                        alert(this.sub_list_array[i].ApproveFlag);
//                        alert(this.sub_list_array[i].ClientIssueNo);
                }

//                    this.sub_list_array.push(obj);
            } else {
//                alert();
            }
        }


    },
    approve: function () {
        /*alert("Inside");
         alert(JSON.stringify(this.sub_list_array));*/

        for (var i = 0; i < this.sub_list_array.length; i++) {
            var y = this.sub_list_array[i];
            var x = {"IssueDetailID": y.IssueDetailID, "ClientIssueNo": y.IssueID, "ApproveFlag": y.ApproveFlag};
//            alert(JSON.stringify(x));
            this.sub_new_array.push(x);
//            alert(JSON.stringify(this.sub_list_array));
        }

        var j = JSON.stringify(this.sub_new_array);
//        alert(j);
//        console.log(j);
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ComplaintApprovalService.svc/UpdateCompliantApproval?objCompliantNo=' + j, function (data) {
            if (data.d == true) {
                alert("Approved Successfully");
                c_approve_list.load();
            } else {
                alert("Failed to Approve !");
                unblock();
            }
        });
    },
    list_prev: function () {
        if (localStorage.page_no <= 1) {
        } else {
            localStorage.page_no--;
            c_approve_list.load();
        }
    },

    list_next: function () {
        //        alert($('#m_ul table').length);
        if ($('#m_ul table').length != 0) {
            if (localStorage.page_no >= 1) {
                localStorage.page_no++;
                c_approve_list.load();
            } else {
            }
        } else {
            alert("End of List, Press Previous");
        }
    },
    search: function () {

        var a, b, c, d, g, tdate, fdate;
        a = new Date();
        b = a.getDate();
        c = a.getMonth() + 1;
        d = a.getFullYear();
        g = d - 1;
        tdate = b + "/" + c + "/" + d;
        fdate = b + "/" + c + "/" + g;

        var s = $('#search_box').val();
        localStorage.page_no=1;
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ComplaintApprovalService.svc/SearchList?PageNo=' + localStorage.page_no + '&RowsPerPage=10&SearchText=' + s + '&ToDate=' + tdate + '&FromDate=' + fdate, function (data) {
            c_approve_list.content(data);
        });
    },
    sear_data: function (data) {
        var s = data.d.length;
        if (s > 0) {
            cmp_assign_list.content(data);
//-------------removes bootstrap modal backdrop not disappearing bug----------------
            $('#sear_mod').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
        }
        else {
            alert("No items to display!");

        }
    }

};


/*
 //---------------------------------------------complaint_approval----------------------------
 var c_approve;
 c_approve = {
 load: function () {
 $("#container").html(this.content);
 $("header").html(this.header);
 this.set_events();

 },
 //   script_pack: "<script src='dar_events.js'></script>",
 header: "<img id='back_img' class='header_icons' src='images/Arrowhead-Left-01-128.png'><h4>Complaint Approval</h4>",
 //    footer: "<small>Copyright @ Vibrant</small>",
 content: function () {
 var template = $("#ca_tmp").html();
 var page = Handlebars.compile(template);
 return page;
 },
 set_events: function () {
 $("#back_img").click(function () {
 mm.load();
 });
 },
 render: function (tmpl_name, tmpl_data) { //----script to load from external html template files(Not yet used in project)
 if (!render.tmpl_cache) {
 render.tmpl_cache = {};
 }

 if (!render.tmpl_cache[tmpl_name]) {
 var tmpl_dir = '/static/templates';
 var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

 var tmpl_string;
 $.ajax({
 url: tmpl_url,
 method: 'GET',
 async: false,
 success: function (data) {
 tmpl_string = data;
 }
 });

 render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
 }

 return render.tmpl_cache[tmpl_name](tmpl_data);
 }
 };
 */



//---------------------------------------------complaint_assignment_list----------------------
var cmp_assign_list;
cmp_assign_list = {

    array_main_list: new Array(),
    obj_assign_item: new Object(),
    load: function () {
//        localStorage.setItem("page_no", 1);
        this.get_data();
    },
    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Complaint Assignment</h4>",
    get_data: function () {

        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ComplaintAssignmentService.svc/ListMainPagebyUserID?PageNO=' + localStorage.page_no + '&RowperPage=10&searchText=""&ClientID=' + localStorage.user_c_id + '&UserID=' + localStorage.user_id, function (data) {
            //cmp_assign_list.content(data);
            if (data.d.length > 0) {
                cmp_assign_list.content(data);
            }
            else {
                alert("End of List, Press Previous");
            }
        });
    },
    content: function (data) {
        var template = $("#cmp_ass_list_temp").html();
        var page = Handlebars.compile(template);

        var context = data;
        var htmls = page(context);
        this.set_contents(htmls);
        this.array_main_list = [];
        this.array_main_list = data.d;

    },
    set_events: function () {
        $("#back_img").click(function () {
            mm.load();
        });
        $("#entry_img").click(function () {
            block();
            cmp_assign_list.load();
        });

        $("#li_pre").click(function () {
            cmp_assign_list.list_prev();
        });

        $("#li_nex").click(function () {
            cmp_assign_list.list_next();
        });

        $("#li_search").click(function () {
            $("#sear_mod").modal('show');
            $('#sear_mod').on('shown.bs.modal', function (e) {
                $("#search_box").focus();
            })
        });

        backdrop_dismiss();
        unblock();
    },
    set_contents: function (x) {
        $("#container").html(x);
        $("header").html(this.header);
        this.set_events();
    },
    get_sub_list: function (a) {
        var x;
        for (var i = 0; i < this.array_main_list.length; i++) {
            if (this.array_main_list[i].IssueID === a) {
                x = this.array_main_list[i];
            }
        }
        this.sub_list(x);
        this.obj_assign_item = {};
        this.obj_assign_item = x;
        this.get_developer(x.CilentID);
    },
    sub_list: function (data) {
        var template = $("#sub_cmp_ass_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_sub(htmls);
    },
    set_sub: function (y) {
        $("#sub_list_modal").html(y);

        $('#sub_li_mod').modal('show');
        $('#sub_li_mod').width('100%');
        $("#due_date").pickadate({
            min: new Date(),
            container: 'body'
        });
        unblock();
    },
    get_developer: function (c) {
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ComplaintAssignmentService.svc/ListDeveloperName?ClientID=' + c, function (data) {
                 cmp_assign_list.appendDeveloper(data);
        });
    },

    appendDeveloper: function (data) {
        var x = data.d;
        x.unshift({"__type": "ComplaintAssignmentService.ComplaintAssignmentDeveloper:#", "ClientID": 1, "DeveloperID": "", "DeveloperName": "--SELECT DEVELOPER--"});

        if (x[0].DeveloperName) {
            var li = "";
            for (var i = 0; i < x.length; i++) {
                if (x != '' || x != null) {
                    li += '<option value="' + x[i].DeveloperID + '" >' + x[i].DeveloperName + '</option>';
                } else {
                    li += '<option value="" >No items</option>';
                }
            }
            $('#sel_dev').append(li).promise().done(function () {
                unblock();
            });

            $('#sel_dev').change(function () {
                $('#sel_dev').blur();
            });

        } else {
            alert('Error connecting to server');
        }
    },

    search: function () {
        localStorage.page_no = 1;
        var s = $('#search_box').val();
//        alert(s);
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ComplaintAssignmentService.svc/ListMainPagebyUserID?PageNO=' + localStorage.page_no + '&RowperPage=10&searchText=' + s + '&ClientID=' + localStorage.user_c_id + '&UserID=' + localStorage.user_id, function (data) {
            cmp_assign_list.sear_data(data);
        });
    },
    sear_data: function (data) {
        var s = data.d.length;
        if (s > 0) {
            cmp_assign_list.content(data);
//-------------removes bootstrap modal backdrop not disappearing bug----------------
            $('#sear_mod').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
        }
        else {
            alert("No items to display!");
        }
    },
    list_prev: function () {
        if (localStorage.page_no <= 1) {
        } else {
            localStorage.page_no--;
            cmp_assign_list.load();
        }
    },

    list_next: function () {
        if ($('#m_ul table').length != 0) {
            if (localStorage.page_no >= 1) {
                localStorage.page_no++;
                cmp_assign_list.load();
            } else {
            }
        } else {
            alert("End of List, Press Previous");
        }

    },
    assign: function () {
        var a = $('#sel_dev').val();
        var b = $('#due_date').val();

        if (a == "" || b == "") {
            alert("Please fill in all the fields");
        }
        else {
            block();

            var z = this.obj_assign_item;
            var d = new Date(b);
            var d1 = d.getDate();
            var d2 = d.getMonth() + 1;
            var d3 = d.getFullYear();
            var e = d3 + "/" + d2 + "/" + d1;

            var obj = { "IssueDetailID": z.IssueDetailID, "IssueID": z.IssueID, "ClientID": z.CilentID, "IssueClientID": 0, "Priority": "medium", "Approvalflag": 1, "IssueDescription": z.IssueDescription, "CreatedBy": z.CreatedBy, "DueDate": e, "AssignedTo": a};

            var data = JSON.stringify(obj);

            $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ComplaintAssignmentService.svc/Create?ObjAssign=' + data, function (data) {
                if (data.d != "") {
                    alert("Assigned Successfully");
                    cmp_assign_list.load(data);
                } else {
                    alert("Failed to Assign !");
                }

            });
        }
    }
};


//---------------------------------------------issue_clearance----------------------------
var iss_clr_list;
iss_clr_list = {
    array_main: new Array(),
    array_main_two: new Array(),
    array_main_list: new Array(),
    array_sub_list: new Array(),
    z: '',

    load: function () {
        this.get_data();
    },
    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Issue Clearance</h4>",
    get_data: function () {
        block();
        var status = $("#status_select :selected").text();
        this.z = status;
        this.array_main_list = [];
        this.array_main = [];
        this.array_main_two = [];
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/IssueClearanceService.svc/ListIssueClearancePage?PageNo=' + localStorage.page_no + '&RowsPerPage=10&SearchText=""&ClientId=' + localStorage.user_c_id + '&UserId=' + localStorage.user_id + '&Status=' + status, function (data) {
            if (data.d.length > 0) {
                iss_clr_list.content(data);
            }
            else {
                alert("End of List, Press Previous");
            }
        });
    },
    content: function (data) {
        //alert(date);
        this.array_main = data.d;
        this.array_main_list = data.d;
        var len = this.array_main_list.length;

        for (var i = 0; i < len; i++) {

            var sd = this.array_main_list[i].StartDate;
            var ed = this.array_main_list[i].EndDate;
            var s = sd.split(" ");
            var e = ed.split(" ");
            var ss = s[0];
            var ee = e[0];
            this.array_main_list[i].StartDate = ss;
            this.array_main_list[i].EndDate = ee;
            /*var q = this.array_main_list[i];
            if(q.Status == 'Completed'){
                q
            }else if(){

            }else if(){

            }else{

            }*/

        }

        var template = $("#iss_clr_list_temp").html();
        var page = Handlebars.compile(template);

        var context = data;
        var htmls = page(context);
        this.set_contents(htmls);


    },
    set_events: function () {
        $("#back_img").click(function () {
            mm.load();
        });

        $("#li_pre").click(function () {
            iss_clr_list.list_prev();
        });

        $("#li_nex").click(function () {
            iss_clr_list.list_next();
        });

        var opts = '';
        if (this.z == 'Opened') {
            opts = "<option>Opened</option><option>All</option><option>Closed</option><option>Completed</option>";
        } else if (this.z == 'Closed') {
            opts = "<option>Closed</option><option>All</option><option>Opened</option><option>Completed</option>";
        } else if (this.z == 'Completed') {
            opts = "<option>Completed</option><option>All</option><option>Opened</option><option>Closed</option>";
        }else{
            opts = "<option>All</option><option>Opened</option><option>Closed</option><option>Completed</option>";
        }

        $("#status_select").append(opts);

        $("#status_select").change(function () {
            localStorage.page_no=1;
            iss_clr_list.get_data();
        });

        $("#li_search").click(function () {
            $("#sear_mod").modal('show');
            $('#sear_mod').on('shown.bs.modal', function (e) {
                $("#search_box").focus();
            })
        });
        //-------------removes bootstrap modal backdrop not disappearing bug----------------
        // $('#mm_modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----


/*-----------color changeing for button----------*/

//        $("{{Status}}").prop("disabled", true);
        $(".Completed .status_color").removeClass("btn-info");
        $(".Completed .status_color").addClass("btn-success");

        $(".Closed .status_color").removeClass("btn-info");
        $(".Closed .status_color").addClass("btn-danger");

        $(".Opened .status_color").removeClass("btn-info");
        $(".Opened .status_color").addClass("btn-warning");
/*-----------------------------------------------*/

        unblock();
    },
    set_contents: function (x) {
        $("#container").html(x);
        $("header").html(this.header);
        this.set_events();
    },

    get_sub_list: function (a) {
        block();

        var len = this.array_main_list.length;
        for (var i = 0; i < len; i++) {

            if (this.array_main_list[i].AssignedID == a && this.array_main[i].AssignedID == a) {
                var y = this.array_main_list[i];
                var z = this.array_main[i];
                this.array_main_two = [];
                this.array_main_two.push(z);
                iss_clr_list.sub_list(y);
            }
        }
    },
    sub_list: function (data) {
        var template = $("#sub_issclr_list_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_sub(htmls);
    },
    sub_list_two: function (data) {

        var template = $("#iss_clr_desc_subli_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_sub_two(htmls);

    },
    set_sub: function (y) {
        $("#sub_list_modal").html(y);
        $('#sub_li_mod').modal('show');


        iss_clr_list.set_datetime();

        unblock();
    },
    set_sub_two: function (y) {
        $("#sub_list_modal_two").html(y);
        $('#sub_li_mod').modal('hide');
        $('#sub_li_mod_two').modal('show');
        iss_clr_list.set_datetime();
        unblock();
    },


    set_datetime: function () {

        $("#ca_approve_but").show();

        var a = $("#iss_clr_stat :selected").text();

        if (a == "Closed" || a == "Completed") {
            $("#iss_clr_stat").attr("disabled", "true");
            $("#frm_time").attr("disabled", "true");
            $("#to_time").attr("disabled", "true");
//            $("#iss_clr_stat").hide();
            $("#frm_time").hide();
            $("#to_time").hide();
            $(".frm_to").hide();
            $("#dail_desc").hide();
            $("#ca_approve_but").hide();
            $("#iss_clr_stat").css("width", "200px");

        } else {
        }
        $("#frm_time").pickatime({
            container: 'body'
        });
        $("#to_time").pickatime({
            container: 'body'
        });
        unblock();
    },
    create: function () {

        var a = $("#iss_clr_stat :selected").text();
        var b = $("#frm_time").val();
        var c = $("#to_time").val();
        var d = $("#dail_desc").val();

        var aa, bb, cc, dd, e;
        aa = new Date();
        bb = aa.getDate();
        cc = aa.getMonth() + 1;
        dd = aa.getFullYear();
        e = dd + "-" + cc + "-" + bb;

        var y = this.array_main_two;
        var z = {"ClosedDate": e, "DailyUpdate": d, "Status": a, "Fromtime": b, "ToTime": c, "EndDate": y[0].EndDate, "StartDate": y[0].StartDate, "AssignedBy": y[0].AssignedBy, "ModuleID": y[0].ModuleID, "CompliantDescription": y[0].CompliantDescription, "AssignedID": y[0].AssignedID, "FormID": y[0].FormID, "SNO": y[0].SNO, "IssueID": y[0].IssueID, "CreatedBy": y[0].CreatedBy, "OurDescription": y[0].OurDescription, "Reason": d};
        var arr_obj = JSON.stringify(z);


        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/IssueClearanceService.svc/Create?objIssueClearance=' + arr_obj, function (data) {
            if (data.d.length > 0) {
                alert("Save Successfully");
                iss_clr_list.load(data);
            } else {
                alert("Failed to Save !");
            }
        });
    },
    list: function (id) {

        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/IssueClearanceService.svc/ListByDetailID?objAssignedID=' + id, function (data) {
            if (data.d.length > 0) {
                iss_clr_list.sub_list_two(data);
            } else {
                alert("no list!");
            }
        });

    },
    list_prev: function () {
        if (localStorage.page_no <= 1) {
        } else {
            localStorage.page_no--;
            iss_clr_list.load();
        }
    },

    list_next: function () {
//        alert($('#m_ul table').length);
        if ($('#m_ul table').length != 0) {
            if (localStorage.page_no >= 1) {
                localStorage.page_no++;
                iss_clr_list.load();
            } else {
            }
        } else {
            alert("End of List, Press Previous");
        }
    },
    search: function () {
        localStorage.page_no = 1;
        var s = $('#search_box').val();
        //alert(s);
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/IssueClearanceService.svc/ListIssueClearancePage?PageNo=' + localStorage.page_no + '&RowsPerPage=10&SearchText='+s+'&ClientId=' + localStorage.user_c_id + '&UserId=' + localStorage.user_id + '&Status=' + status, function (data) {
            iss_clr_list.sear_data(data);
        });
    },
    sear_data: function (data) {
        var s = data.d.length;
        if (s > 0) {
            iss_clr_list.content(data);
//-------------removes bootstrap modal backdrop not disappearing bug----------------
            $('#sear_mod').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
        }
        else {
            alert("No items to display!");
        }
    }


};


//-----------------------------------------Assignment_status_list_object---------------------------------------
var assign_stat_li;
assign_stat_li = {
    sub_list_array: new Array(),
    obj_sub : new Object(),
    z: '',
    load: function () {

        this.get_data();
    },
    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Assignment Status</h4>",
    get_data: function () {
        block();
        var status = $("#status_select :selected").text();

        this.z = status;

        $.getJSON('http://182.73.141.106/mobile/IssueTrackerMobile/AssignmentStatusService.svc/ListworkassignmentStausfromtodad?PageNo=' + localStorage.page_no + '&RowperPage=10&SearchText=""&status='+ status +'&UserID=' + localStorage.user_id, function (data) {

            if (data.d.length > 0) {

                assign_stat_li.content(data);
            }
            else {
                alert("End of List, Press Previous");
            }
        });

    },
    content: function (data) {
        this.sub_list_array = data.d;

        var template = $("#ass_stat_list_tmp").html();
        var page = Handlebars.compile(template);

        var context = data;
        var htmls = page(context);
        this.set_contents(htmls);
    },
    set_events: function () {
        $("#back_img").click(function () {
            mm.load();
        });

        $("#li_pre").click(function () {
            assign_stat_li.list_prev();
        });

        $("#li_nex").click(function () {
            assign_stat_li.list_next();
        });

        var opts = '';
        if (this.z == 'Opened') {
            opts = "<option>Opened</option><option>All</option><option>Closed</option><option>Completed</option><option>UnOpened</option>";
        } else if (this.z == 'Closed') {
            opts = "<option>Closed</option><option>All</option><option>Opened</option><option>Completed</option><option>UnOpened</option>";
        } else if (this.z == 'Completed') {
            opts = "<option>Completed</option><option>All</option><option>Opened</option><option>Closed</option><option>UnOpened</option>";
        }else if (this.z == 'UnOpened'){
            opts = "<option>UnOpened</option><option>All</option><option>Opened</option><option>Closed</option><option>Completed</option>";
        }else{
            opts = "<option>All</option><option>Opened</option><option>Closed</option><option>Completed</option><option>UnOpened</option>";
        }

        $("#status_select").append(opts);

        $("#status_select").change(function () {
            localStorage.page_no = 1;
            assign_stat_li.get_data();
        });


        $("#li_search").click(function () {
            $("#sear_mod").modal('show');
            $('#sear_mod').on('shown.bs.modal', function (e) {
                $("#search_box").focus();
            })
        });

        /*-----------color changeing for button----------*/

//        $("{{Status}}").prop("disabled", true);
        $(".Completed .status_color").removeClass("btn-info");
        $(".Completed .status_color").addClass("btn-success");

        $(".Closed .status_color").removeClass("btn-info");
        $(".Closed .status_color").addClass("btn-danger");

        $(".Opened .status_color").removeClass("btn-info");
        $(".Opened .status_color").addClass("btn-warning");

        $(".UnOpened .status_color").removeClass("btn-info");
        $(".UnOpened .status_color").addClass("btn-primary");
        /*-----------------------------------------------*/


        unblock();
    },
    set_contents: function (x) {
        $("#container").html(x);
        $("header").html(this.header);
        this.set_events();

    },

    sub_list: function () {
        var template = $("#assign_stat_sub_tmp").html();
        var page = Handlebars.compile(template);
        var context = this.obj_sub;
        var htmls = page(context);
        this.set_sub(htmls);
    },
    set_sub: function (y) {
        $("#sub_list_modal").html(y);

        $('#sub_li_mod').modal('show');

        unblock();


    },
    list_prev: function () {
        if (localStorage.page_no <= 1) {
        } else {
            localStorage.page_no--;
            assign_stat_li.load();
        }
    },

    list_next: function () {
        if ($('#m_ul table').length != 0) {
            if (localStorage.page_no >= 1) {
                localStorage.page_no++;
                assign_stat_li.load();
            } else {
            }
        } else {
            alert("End of List, Press Previous");
        }

    },
    sear_data: function (data) {
        var s = data.d.length;
        if (s > 0) {
            assign_stat_li.content(data);
//-------------removes bootstrap modal backdrop (not disappearing) bug----------------
            $('#sear_mod').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop (not disappearing) bug----^^^^^^^^^----
        }
        else {
            alert("No items to display!");
        }
    },

    search: function () {
        localStorage.page_no = 1;
        var s = $('#search_box').val();

        $.getJSON('http://182.73.141.106/mobile/IssueTrackerMobile/AssignmentStatusService.svc/ListworkassignmentStausfromtodad?PageNo=' + localStorage.page_no + '&RowperPage=10&SearchText='+ s +'&status='+ status +'&UserID=' + localStorage.user_id, function (data) {
            assign_stat_li.sear_data(data);
        });
    },

    sub_get: function (x) {
        for (var i = 0; i < this.sub_list_array.length; i++) {
            if (x == this.sub_list_array[i].AssignID) {
                this.obj_sub = this.sub_list_array[i];
                this.sub_list();
            } else {
            }
        }
    }
};
//---------------------------------------------client_admin_view_list----------------------------------------

var cli_admin_list;
cli_admin_list = {

    sub_list_array: new Array(),
    sub_obj_array: new Array(),

    z:'',
    load: function () {

        this.get_data();
    },
    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Client Admin View</h4>",
    get_data: function () {
        block();
        var status = $("#status_select :selected").text();

        this.z = status;

        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ClientAdminViewService.svc/StatusMainList?PageNo=' + localStorage.page_no + '&RowsPerPage=10&SearchText=""&ClientID=' + localStorage.user_c_id + '&Status='+ status +'&roleid='+ 1 +'&UserID='+ localStorage.user_id, function (data) {

            if(data.d.length>0)
            {
                cli_admin_list.content(data);
            }
            else{
                alert("End of List, Press Previous");
            }
        });
    },
    content: function (data) {
        this.sub_list_array=data.d;
        var template = $("#cli_admin_list_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_contents(htmls);
    },
    set_contents: function (x) {
        $("#container").html(x);
        $("header").html(this.header);
        this.set_events();
    },
    set_events: function () {
        $("#back_img").click(function () {
            mm.load();
        });

        $("#li_pre").click(function () {
            cli_admin_list.list_prev();
        });

        $("#li_nex").click(function () {
            cli_admin_list.list_next();
        });

        $("#complete_btn").click(function () {
            block();
            cli_admin_list.complete();
        });
        $("#ca_cancel_but").click(function () {

            $('#sub_li_mod').modal('hide');
            this.sub_list_array = [];
        });
        var opts = '';
        if (this.z == 'Opened') {
            opts = "<option>Opened</option><option>All</option><option>Closed</option><option>Completed</option><option>UnOpened</option>";
        } else if (this.z == 'Closed') {
            opts = "<option>Closed</option><option>All</option><option>Opened</option><option>Completed</option><option>UnOpened</option>";
        } else if (this.z == 'Completed') {
            opts = "<option>Completed</option><option>All</option><option>Opened</option><option>Closed</option><option>UnOpened</option>";
        }else if (this.z == 'UnOpened') {
            opts = "<option>UnOpened</option><option>Completed</option><option>All</option><option>Opened</option><option>Closed</option>";
        }else{
            opts = "<option>All</option><option>Opened</option><option>Closed</option><option>Completed</option><option>UnOpened</option>";
        }

        $("#status_select").append(opts);

        $("#status_select").change(function () {
            localStorage.page_no = 1;
            cli_admin_list.get_data();
        });

        $("#li_search").click(function () {
            $("#sear_mod_cli_adm").modal('show');
            $('#sear_mod_cli_adm').on('shown.bs.modal', function (e) {
                $("#search_box").focus();
            })
        });
        //-------------removes bootstrap modal backdrop not disappearing bug----------------
        // $('#mm_modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----

        /*-----------color changeing for button----------*/

//        $("{{Status}}").prop("disabled", true);
        $(".Completed .status_color").removeClass("btn-info");
        $(".Completed .status_color").addClass("btn-success");

        $(".Closed .status_color").removeClass("btn-info");
        $(".Closed .status_color").addClass("btn-danger");

        $(".Opened .status_color").removeClass("btn-info");
        $(".Opened .status_color").addClass("btn-warning");

        $(".UnOpened .status_color").removeClass("btn-info");
        $(".UnOpened .status_color").addClass("btn-primary");
        /*-----------------------------------------------*/

        unblock();
    },

    list_prev: function () {
        if (localStorage.page_no <= 1) {
        } else {
            localStorage.page_no--;
            cli_admin_list.load();
        }
    },

    list_next: function () {
        if (localStorage.page_no >= 1) {
            localStorage.page_no++;
            cli_admin_list.load();
        } else {
        }
    },
    sear_data: function (data) {
        var s = data.d.length;
        if (s > 0) {
            cli_admin_list.content(data);
            //-------------removes bootstrap modal backdrop not disappearing bug----------------
            $('#sear_mod').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
        }
        else {
            alert("No items to display!");
        }
    },

    search: function () {
        localStorage.page_no=1;
        var s = $('#search_box').val();
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ClientAdminViewService.svc/StatusMainList?PageNo=' + localStorage.page_no + '&RowsPerPage=10&SearchText='+ s +'&ClientID=' + localStorage.user_c_id + '&Status=""&roleid='+ 1 +'&UserID='+ localStorage.user_id, function (data) {
            cli_admin_list.sear_data(data);
        });
    },
    get_sub_list:function(c){
        var arr=this.sub_list_array;
        var len=this.sub_list_array.length;
        var x;
        for(var i=0;i<len;i++){
            if(this.sub_list_array[i].CompliantNo == c){
                x=this.sub_list_array[i];
            }else{
            }
        }
        this.sub_obj_array=[];
        this.sub_obj_array.push(x);
        this.sub_list(x);

    },

    sub_list: function (data) {
        var template = $("#sub_cli_adm_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_sub(htmls);
    },
    set_sub: function (y) {
        $("#sub_list_modal").html(y);
        $('#sub_li_mod').modal('show');
        $('#sub_li_mod').width('100%');
        unblock();
    },
    complete:function(){

        var aa=this.sub_obj_array;
        var dd={"CompliantNo":aa[0].CompliantNo,"Sno":aa[0].Sno,"ClientIssueNo":aa[0].CompliantNo,"FinalStatus":"Complete"}
        var cc={"CompliantDetailId":aa[0].CompliantDetailId,"Status":"complete"}
        var data1=JSON.stringify(cc);
        var data=JSON.stringify(dd);

        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ClientAdminViewService.svc/UpdateReassign?objCompliantNo='+ data, function (data) {

            if(data.d="false")
            {
                $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/ClientAdminViewService.svc/UpdateRequest?ObjclientadminRequest='+ data1, function (data) {
                    if(data.d="true")
                    {
                        alert("Completed Successfully ");
                        cli_admin_list.load(data);
                    }
                    else{
                        alert("Failed complete !");
                    }
                });
            }
            else{
                alert("Failed complete !");
            }
        });
    }
};



//---------------------------------------------daily_activity_report_List----------------------------------------

var daily_act_list;
daily_act_list = {

    sub_list_array: new Array(),
    sub_obj_array: new Array(),

    load: function () {

        this.get_data();
    },
    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Daily Activity Report</h4><img id='entry_img' class='entry_icons' src='images/newAdd_128.png'>",
    get_data: function () {
        block();
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/DailyActivityReportService.svc/ListMainPage?PageNO=' + localStorage.page_no + '&RowperPage=10&searchText=""&userid='+ localStorage.user_id, function (data) {

            if(data.d.length>0)
            {
                daily_act_list.content(data);
            }
            else{
                alert("End of List, Press Previous");
            }
        });
    },
    content: function (data) {
        this.sub_list_array=data.d;
        var template = $("#daily_act_list_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_contents(htmls);
    },
    set_contents: function (x) {
        $("#container").html(x);
        $("header").html(this.header);
        this.set_events();
    },
    set_events: function () {
        $("#back_img").click(function () {
            mm.load();
        });

        $("#entry_img").click(function () {
            d_act_report.load();
        });

        $("#li_pre").click(function () {
            daily_act_list.list_prev();
        });

        $("#li_nex").click(function () {
            daily_act_list.list_next();
        });

        $("#complete_btn").click(function () {
            block();
            daily_act_list.complete();
        });
        $("#ca_cancel_but").click(function () {

            $('#sub_li_mod').modal('hide');
            this.sub_list_array = [];
        });
        $("#li_search").click(function () {
            $("#sear_mod_daily_act").modal('show');
            $('#sear_mod_daily_act').on('shown.bs.modal', function (e) {
                $("#search_box").focus();
            })
        });
        //-------------removes bootstrap modal backdrop not disappearing bug----------------
        // $('#mm_modal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
        unblock();
    },
    list_prev: function () {
        if (localStorage.page_no <= 1) {
        } else {
            localStorage.page_no--;
            daily_act_list.load();
        }
    },

    list_next: function () {
        if (localStorage.page_no >= 1) {
            localStorage.page_no++;
            daily_act_list.load();
        } else {
        }
    },
    sear_data: function (data) {
        var s = data.d.length;

        if (s > 0) {
            daily_act_list.content(data);
            //-------------removes bootstrap modal backdrop not disappearing bug----------------
            $('#sear_mod').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
//^^^^^^^^^^^^^---removes bootstrap modal backdrop not disappearing bug----^^^^^^^^^----
        }
        else {
            alert("No items to display!");
        }
    },

    search: function () {
        localStorage.page_no=1;
        var s = $('#search_box').val();
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/DailyActivityReportService.svc/ListMainPage?PageNO=' + localStorage.page_no + '&RowperPage=10&searchText='+ s +'&userid='+ localStorage.user_id, function (data) {
            daily_act_list.sear_data(data);
        });
    },

    get_sub_list:function(id){

        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/DailyActivityReportService.svc/ListByUDRID?UDRID=' + id, function (data) {

            if(data.d.length>0)
            {
                daily_act_list.sub_list(data);
            }
            else{
                alert("End of List, Press Previous");
            }
        });


    },
    sub_list: function (data) {

        var template = $("#sub_daily_act_rpt_tmp").html();
        var page = Handlebars.compile(template);
        var context = data;
        var htmls = page(context);
        this.set_sub(htmls);
    },
    set_sub: function (y) {
        $("#sub_list_modal").html(y);
        $('#sub_li_mod').modal('show');
        $('#sub_li_mod').width('100%');

        unblock();
    }


};
//---------------------------------------------daily_activity_report_object----------------------------
var d_act_report;
d_act_report = {
    dar_obj: new Array(),
    dar_list_obj: new Array(),
    daily_rend_obj:new Array(),

    load: function () {
        block();
           this.dar_obj=[];
            this.dar_list_obj=[];
            this.daily_rend_obj=[];

        $("#container").html(this.content);
        $("header").html(this.header);
        this.get_report_to();
        this.get_issue_no();
        this.set_events();
    },

    header: "<img id='back_img' class='header_icons' src='images/home_back_128.png'><h4>Daily Activity Report</h4><img id='list_img' class='entry_icons' src='images/listFlatWhite_128.png'>",

    content: function () {
        var template = $("#dar_tmp").html();
        var page = Handlebars.compile(template);
        return page;
    },
    set_datetime: function () {

        $("#r_date").pickadate({
            max: new Date(),
            container:'body'
        });

        $("#f_t").pickatime();
        $("#t_t").pickatime();
    },
    set_events: function () {
        this.set_datetime();
        $("#back_img").click(function () {
            mm.load();
        });
        $("#list_img").click(function () {
            block();
            localStorage.page_no = 1;
            daily_act_list.load();
        });
        $("#add_dar").click(function () {

            d_act_report.add_list();
        });

        unblock();
    },
    render_add_list: function () {
        var template = $("#daily_act_add_tmp").html();
        var page = Handlebars.compile(template);

        var data = {"d": ""};
        data.d = this.daily_rend_obj;
        var context = data;

        var htmls = page(context);

        $("#daily_ul").html(htmls);

        $("#sub_dar").click(function () {
            d_act_report.submit();
        });
        $("#can_dar").click(function () {
            d_act_report.load();
        });
    },
    get_report_to: function () {
        block();
        // alert("report to");
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/DailyActivityReportService.svc/ListUserwise?UserID=' + localStorage.user_id, function (data) {
                d_act_report.appendReportTo(data);
        });
    },
    appendReportTo: function (data) {
        // alert("report to");
        var x = data.d;
        //alert(JSON.stringify(x));
        x.unshift({"__type":"DailyActivityReportService.ReportUser:#", "UserId": "", "ReportTo": "--SELECT--"});

        if (x[0].ReportTo) {
            var li = "";
            for (var i = 0; i < x.length; i++) {
                if (x != '' || x != null) {
                    li += '<option value="' + x[i].UserId + '" >' + x[i].ReportTo + '</option>';
                } else {
                    li += '<option value="" >No items</option>';
                }
            }
            $('#rep_to').append(li).promise().done(function () {
                unblock();
            });
        } else {
            alert('Error connecting to server');
        }

    },
    get_issue_no: function () {
        block();
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/DailyActivityReportService.svc/IssueRefNo?PageNO='+ localStorage.page_no +'&RowsPerPage=10&Status=""&SearchText=""&UserId='+localStorage.user_id+'&ClientId='+localStorage.user_c_id , function (data) {
            d_act_report.appendIssueNo(data);
        });
    },
    appendIssueNo: function (data) {
        var x = data.d;
        x.unshift({"__type":"DailyActivityReportService.RefIssueNo:#", "CompltIssueNo": "--SELECT--"});

        if (x[0].CompltIssueNo) {
            var li = "";
            for (var i = 0; i < x.length; i++) {
                if (x != '' || x != null) {
                    li += '<option value="' + x[i].CompltIssueNo + '" >' + x[i].CompltIssueNo + '</option>';
                } else {
                    li += '<option value="" >No items</option>';
                }
            }
            $('#is_no').append(li).promise().done(function () {
                unblock();
            });
        } else {
            alert('Error connecting to server');
        }
    },
    add_list: function () {
        var a = $('#rep_to :selected').text();

        var b = $('#is_no :selected').text();

        var c = $('#f_t').val();

        var d = $('#t_t').val();

        var e = $('#desc').val();

        var f=$('#r_date').val();

        $('#desc').val("");

        if (a == null || b == null || c == null || d == null || e == null || a == '--SELECT--' || b == '--SELECT--' || c == '' || d == '' || e == '') {
            alert("Please fill in all the fields");
        } else {
            var rend_list_obj = {"FromTime": c, "Description": e, "ToTime": d, "ReportTo": a,"IssueRef":b};
            var single_obj = { "FromTime": c, "ToTime": d, "UserId": localStorage.user_id, "Rptdate":f, "CreatedBy": localStorage.user_id, "ReportTo": a};
            var list_obj =  { "FromTime": c, "ToTime": d, "UserId": localStorage.user_id, "Rptdate":f, "CreatedBy": localStorage.user_id, "ReportTo": a,"IssueRef":b,"UDRID":"","Description":e,"SNO":0};
            this.push_obj(single_obj, list_obj, rend_list_obj);
        }
    },
    del_item: function (x) {

        var y = confirm("Confirm Delete?");
        if (y) {
            this.dar_list_obj.splice(x, 1);
            this.dar_obj.splice(x, 1);
            this.daily_rend_obj.splice(x, 1);

            if (this.daily_rend_obj.length == 0) {
                this.clr_sub();
            } else {
                this.render_add_list();
            }
        } else {
            return false;
        }
    },
    clr_sub: function () {
        var template = $("#daily_act_add_tmp").html();
        var page = Handlebars.compile(template);
        var data = {"d": ""};
        data.d = this.daily_rend_obj;
        var context = data;
        var htmls = page(context);
        $("#daily_ul").html(htmls);
        $("#sub_dar").click(function () {
            d_act_report.submit();
        });
        $("#can_dar").click(function () {
            d_act_report.load();
        });
        $('#button_div').html("");
    },
    push_obj: function (single_obj, list_obj, rend_list_obj) {
        this.dar_obj.push(single_obj);
        this.dar_list_obj.push(list_obj);
        this.daily_rend_obj.push(rend_list_obj);
        this.render_add_list();
    },
    submit: function () {
        var list = JSON.stringify(this.dar_obj[0]);
        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/DailyActivityReportService.svc/Create?objUser=' + list, function (data) {
            d_act_report.submit_return(data);
        });
    },
    submit_return: function (data) {
        // alert("return");
        var y = data.d;
        var x = this.dar_list_obj.length;
        for (var i = 0; i < x; i++) {
            this.dar_list_obj[i].UDRID = y;
            this.dar_list_obj[i].SNO=i+1;
        }
        var list = JSON.stringify(this.dar_list_obj);
        //alert(JSON.stringify(this.dar_list_obj));

        $.getJSON('http://182.73.141.106/Mobile/IssueTrackerMobile/DailyActivityReportService.svc/CreateDtl?objCreateDtl=' + list, function (data) {
            if (data.d!="") {
                alert("Saved Successfully");
                localStorage.page_no = 1;
                daily_act_list.load();
            } else {
                alert("Failed to Save !");
            }
        });
    }
};