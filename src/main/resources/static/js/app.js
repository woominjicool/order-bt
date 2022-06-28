

//페이징 html 셋팅
function refreshPaging(totalData, currentPage, grid, gridId) {
    //페이지 사이즈
    const dataPerPage = grid.collectionView.pageSize; // 그리드의 한 페이지당 보여지는 행의 개수
    // 페이지 숫자 목록
    const pageCount = 5;
    //전체 페이지
    const totalPage = Math.ceil(totalData / dataPerPage);
    //페이지그룹
    const pageGroup = Math.ceil(currentPage / pageCount);

    let last = pageGroup * pageCount; // 가장 마지막 인덱스

    if (last > totalPage) {
        last = totalPage;
    }

    let first = last - (pageCount - 1);

    const next = last + 1; // 다음
    var prev = first - 1; // 이전

    if (totalPage < 1) {
        first = last;
    }

    const pages = $('#' + gridId + 'Pager');
    pages.empty();

    // <<  <
    pages.append('<span onClick="clickPager(1, ' + gridId + ', ' + "'" + gridId + "'" + ')" > << </span>');
    if (first > pageCount) {
        pages.append('<span onClick="clickPager(' + prev + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + '<' + ' </span>');
    } else {
        pages.append('<span onClick="clickPager(1, ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + '<' + ' </span>');
    }

    // 현재 페이지 인덱스 만큼 append
    for (let j = first; j <= last; j++) {
        if (currentPage === j) {
            pages.append('<span data-page="' + j +'" class="selectPage" id="' + gridId + 'paging_' + j + '" onClick="clickPager(' + j + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + j + ' </span>');

        } else if (j > 0) {
            pages.append('<span data-page="' + j +'" id="' + gridId + 'paging_' + j + '" onClick="clickPager(' + j + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + j + ' </span>');

        }
    }

    // >  >>
    if (next > pageCount && next < totalPage) {
        pages.append('<span onClick="clickPager(' + next + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" >  ' + '>' + ' </span>');
    } else {
        pages.append('<span onClick="clickPager(' + totalPage + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" >  ' + '>' + ' </span>');
    }
    pages.append('<span onClick="clickPager(' + totalPage + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > >> </span>');


    $(".pager").removeClass('wj-control wj-content wj-pager wj-collectionview-navigator wj-state-empty wj-state-readonly');
}



function loadGridUserList(gridBindings, layoutName, lists= []) {

    var gridView = new wijmo.collections.CollectionView(lists, {
        pageSize: 30
    });

    var setGridPager = new wijmo.input.CollectionViewNavigator('#setGridPager', {
        byPage: true,
        headerFormat: '{currentPage:n0} / {pageCount:n0}',
        cv: gridView
    });

    var setGrid = new wijmo.grid.FlexGrid('#setGrid', {
        autoGenerateColumns: false,
        alternatingRowStep: 0,
        columns: gridBindings,
        itemsSource: gridView,
        keyActionEnter: "MoveDown",
        imeEnabled: true,
        loadedRows: function (s, e) {
        },
        cellEditEnded: function (s, e) {
            // s.autoSizeColumn(e.col);
        },
        rowEditEnded: function (s, e) {
            // s.autoSizeColumns();
        },
        itemFormatter: function (p, r, c, cell) {

            if (p.cellType == wijmo.grid.CellType.RowHeader) {
                //cell.textContent = (r+1).toString();
                cell.textContent = (gridView.pageSize * gridView.pageIndex + r + 1).toString();
            }
        }
    });


    _setUserGridLayout(layoutName, setGrid, gridBindings);
    refreshPaging(setGrid.collectionView.totalItemCount, 1, setGrid, 'setGrid');  // 페이징 초기 셋팅

    return {
        setGrid,
        setGridPager,
        gridView
    }
}


/* 한 페이지에 그리드 2개 이상있을때 그리드영역 대상 지정하기 */
function loadGridUserListTargetFocus(gridBindings, layoutName, targetObject) {

    var gridView = new wijmo.collections.CollectionView([], {
        pageSize: 30
    });

    var setGridPager = new wijmo.input.CollectionViewNavigator(targetObject.setGridPager, {
        byPage: true,
        headerFormat: '{currentPage:n0} / {pageCount:n0}',
        cv: gridView
    });

    var setGrid = new wijmo.grid.FlexGrid(targetObject.setGrid, {
        autoGenerateColumns: false,
        alternatingRowStep: 0,
        columns: gridBindings,
        itemsSource: gridView,
        keyActionEnter: "MoveDown",
        imeEnabled: true,
        loadedRows: function (s, e) {
        },
        cellEditEnded: function (s, e) {
            // s.autoSizeColumn(e.col);
        },
        rowEditEnded: function (s, e) {
            // s.autoSizeColumns();
        },
        itemFormatter: function (p, r, c, cell) {

            if (p.cellType == wijmo.grid.CellType.RowHeader) {
                //cell.textContent = (r+1).toString();
                cell.textContent = (gridView.pageSize * gridView.pageIndex + r + 1).toString();
            }
        }
    });

    _setUserGridLayout(layoutName, setGrid, gridBindings);
    refreshPaging(setGrid.collectionView.totalItemCount, 1, setGrid, targetObject.setGrid.replace("#", ""));  // 페이징 초기 셋팅

    return {
        setGrid,
        setGridPager,
        gridView
    }
}



/* 트리그리드 */
function loadGridGroup(gridBindings, layoutName, lists= []) {

    var gridView = new wijmo.collections.CollectionView(lists, {
        pageSize: 100,
        trackChanges: true
    });

    var setGridPager = new wijmo.input.CollectionViewNavigator('#setGridPager', {
        byPage: true,
        headerFormat: '{currentPage:n0} / {pageCount:n0}',
        cv: gridView
    });

    var setGrid = new wijmo.grid.FlexGrid('#setGrid', {
        autoGenerateColumns: false,
        alternatingRowStep: 0,
        headersVisibility: 'Column',
        childItemsPath: ['item', 'item', 'item'],
        columns: gridBindings,
        itemsSource: gridView,
        keyActionEnter: "MoveDown",
        imeEnabled: true,
        loadedRows: function (s, e) {
            s.rows.forEach(function (row) {
                if(row.level === 3){
                    row.isReadOnly = false;

                }
            });
        },
        formatItem:function(s,e){
            var firstDepth = document.querySelectorAll(".wj-row[aria-level='1'] button.wj-cell-maker");
            firstDepth.forEach((el, i) => {
                el.remove();
            })
            var secondDepth = document.querySelectorAll(".wj-row[aria-level='2'] button.wj-cell-maker");
            secondDepth.forEach((el, i) => {
                el.remove();
            })
        },
        cellEditEnded: function (s, e) {
            // s.autoSizeColumn(e.col);
        },
        rowEditEnded: function (s, e) {
            // s.autoSizeColumns();

        },
    });

    var gridCheckbox = new wijmo.grid.selector.Selector(setGrid, {
        itemChecked: (i, e) => {
        },
    });

    gridCheckbox.column = setGrid.columns[1];

    _setUserGridLayout(layoutName, setGrid, gridBindings);


    refreshPaging(setGrid.collectionView.totalItemCount, 1, setGrid, 'setGrid');  // 페이징 초기 셋팅

    return {
        setGrid,
        setGridPager,
        gridView,
        gridCheckbox
    }
}


/* 트리그리드 */
function loadGridGroupClickEvent(gridBindings, layoutName, lists= []) {

    var gridView = new wijmo.collections.CollectionView(lists, {
        pageSize: 100,
        trackChanges: true
    });

    var setGridPager = new wijmo.input.CollectionViewNavigator('#setGridPager', {
        byPage: true,
        headerFormat: '{currentPage:n0} / {pageCount:n0}',
        cv: gridView
    });

    var setGrid = new wijmo.grid.FlexGrid('#setGrid', {
        autoGenerateColumns: false,
        alternatingRowStep: 0,
        headersVisibility: 'Column',
        childItemsPath: ['item', 'item', 'item'],
        columns: gridBindings,
        itemsSource: gridView,
        keyActionEnter: "MoveDown",
        imeEnabled: true,
        loadedRows: function (s, e) {
            s.rows.forEach(function (row) {
                if(row.level === 3){
                    row.isReadOnly = false;

                }
            });
        },
        formatItem:function(s,e){
            var firstDepth = document.querySelectorAll(".wj-row[aria-level='1'] button.wj-cell-maker");
            firstDepth.forEach((el, i) => {
                el.remove();
            })
            var secondDepth = document.querySelectorAll(".wj-row[aria-level='2'] button.wj-cell-maker");
            secondDepth.forEach((el, i) => {
                el.remove();
            })
        },
        cellEditEnded: function (s, e) {
            // s.autoSizeColumn(e.col);
        },
        rowEditEnded: function (s, e) {
            // s.autoSizeColumns();

        },
    });

    var gridCheckbox = new wijmo.grid.selector.Selector(setGrid, {
        itemChecked: () => {
        },
    });
    gridCheckbox.column = setGrid.columns[1];


    _setUserGridLayout(layoutName, setGrid, gridBindings);


    refreshPaging(setGrid.collectionView.totalItemCount, 1, setGrid, 'setGrid');  // 페이징 초기 셋팅

    return {
        setGrid,
        setGridPager,
        gridView,
        gridCheckbox
    }
}





//팝업 오픈
function showPop(pop){

    var imgPath;

    switch (pop)
    {
        case "image":
            imgPath = setGrid.collectionView.currentItem["idprofile"];
            break;
        case "meetingImgPath":
            imgPath = setGrid.collectionView.currentItem["meetingImgPath"];
            break;
        default:
            imgPath = setGrid.collectionView.currentItem["idprofile"];
            break;
    }

    var img = '<img class="comment_img" src="'+imgPath+'"alt="이미지">';
    $('#imgPath').append(img)
    $('#image').addClass('is-visible');
}



//페이지 클릭이벤트
function clickPager(idx, grid, gridId) {

    var query_string = new URLSearchParams(window.location.search);

    if (query_string.has('page')) {
        query_string.set("page", idx)
    } else {
        query_string.append("page", idx);
    }

    document.searchForm.page.value = idx;
    makeUrlHistoryPoint({ path: query_string.toString() });
    grid.collectionView.moveToPage(idx - 1); // 그리드 0부터 시작
    refreshPaging(grid.collectionView.totalItemCount, idx, grid, gridId); // 그리드의 전체 아이템 수, 클릭한 인덱스 값 넘겨주기
}



//회원 리스트 조회
function perPage(count) {
    setGrid.beginUpdate();
    gridView.pageSize = Number(count);
    setGrid.endUpdate();

    var query_string = new URLSearchParams(window.location.search);

    if (query_string.has('perPage')) {
        query_string.set("perPage", count)
    } else {
        query_string.append("perPage", count)
    }

    makeUrlHistoryPoint({ path: query_string.toString() });
    refreshPaging(setGrid.collectionView.totalItemCount, 1, setGrid, 'setGrid');  // 페이징 초기 셋팅
}



//그리드 초기 레이아웃 복원
function _resetUserGridLayout(layoutId, grid, initColumns) {

    grid.columns.clear();
    initColumns.forEach((col) => {
        grid.columns.push(new wijmo.grid.Column(col));
    });

    localStorage.setItem(layoutId, grid.columnLayout);
    alert("컬컴위치를 초기화하였습니다.");
    _setUserGridLayout(layoutId, grid, initColumns);
}

//그리드 레이아웃 저장
function _getUserGridLayout(layoutId, grid) {
    alert("컬럼위치를 저장하였습니다.");
    localStorage.setItem(layoutId, grid.columnLayout);
}



//그리드 레이아웃 복원
function _setUserGridLayout(layoutId, grid, initColumns) {

    if (window.localStorage[layoutId]) {
        let columnsArr = JSON.parse(window.localStorage[layoutId]).columns;

        grid.columns.clear();
        columnsArr.forEach((col) => {
            initColumns.forEach((col2) => {
                if (col.binding == col2.binding) {
                    grid.columns.push(new wijmo.grid.Column(col2));
                }
            });
        });
    }

}

function exportExcel(filename){

    var serGridCollectionView = setGrid.collectionView;
    var oldPgSize = serGridCollectionView.pageSize;
    var oldPgIndex = serGridCollectionView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    setGrid.beginUpdate();
    gridView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(setGrid, {includeCellStyles: true, includeColumnHeaders: true}, filename + '.xlsx',
        saved => {
            serGridCollectionView.pageSize = oldPgSize;
            serGridCollectionView.moveToPage(oldPgIndex);
            setGrid.endUpdate();
        }, null
    );

}


// 뒤로가기 포인트 만들기
function makeUrlHistoryPoint(data) {
    var title = data.title ?? document.title;
    var path = data.path ?? "";

    window.history.pushState({}, title, "?" + path);
}

// window.onpopstate = function (e) {
//     var query_string = new URLSearchParams(window.location.search);
//     const params = paramsToObject(query_string.entries());
//     console.log(params);
// }



//팝업 종료
function closePop(){
    $('#imgPath').empty();
    $('.popup').removeClass('is-visible');
}



function paramsToObject(entries) {
    const result = {}
    for(const [key, value] of entries) {
        result[key] = value;
    }
    return result;
}


window.onpopstate = function (e) {
    var query_string = new URLSearchParams(window.location.search);
    const params = paramsToObject(query_string.entries());
    const f = document.searchForm;

    for (key in params) {
        if (typeof f[key] == "undefined") continue
        f[key].value = params[key];
    }

    // getProjectList();
}

/* 전체/진행중/종료 선택 */
function processTypeChanger(_value, callback) {
    var f = document.searchForm;
    f.active.value = _value
    callback()
}

function modalPop(ctx, target=false) {

    var modal;
    if (target) {
        modal = target;
    } else {
        modal = $(".modal.edit_modal");
    }

    var opacity = modal.css("opacity");
    $(".btn_style01.create").css("display", "none");
    $(".btn_style01.update").css("display", "inline-block");


    if (opacity == "1") { // 모달끄기
        modal.css({
            opacity: 0,
            visibility: "hidden"
        })
    } else { // 모달켜기
        var item = ctx.item;

        modal.css({
            opacity: 1,
            visibility: "visible"
        })

        var f = document.modifyForm;

        for (let key in item) {
            if (typeof item[key] == null
                || typeof item[key] == 'undefined'
                || typeof f[key] == 'undefined'
            ) continue
            f[key].value = item[key];
        }

    }

    setTimeout(function () {

        $(".modal-form-title.create", modal).css("display", "none");
        $(".modal-form-title.modify", modal).css("display", "block");

    }, 500)


}



function showDateRange(s, _el) {
    let el = document.querySelector(_el);
    el.textContent = wijmo.format('from {value:d} to {rangeEnd:d}', s);
}

// get predefined date ranges
function getPredefinedRanges() {
    let dt = wijmo.DateTime, now = new Date();
    return {
        // custom
        '선택': null,
        // days
        //'Today': [now, now],
        //'Yesterday': [dt.addDays(now, -1), dt.addDays(now, -1)],
        //'Tomorrow': [dt.addDays(now, +1), dt.addDays(now, +1)],
        // weeks
        '이번주': [dt.weekFirst(now), dt.weekLast(now)],
        '지난주': [dt.weekFirst(dt.addDays(now, -7)), dt.weekLast(dt.addDays(now, -7))],
        '다음주': [dt.weekFirst(dt.addDays(now, +7)), dt.weekLast(dt.addDays(now, +7))],
        // months
        '이번달': [dt.monthFirst(now), dt.monthLast(now)],
        '지난달': [dt.monthFirst(dt.addMonths(now, -1)), dt.monthLast(dt.addMonths(now, -1))],
        '다음달': [dt.monthFirst(dt.addMonths(now, +1)), dt.monthLast(dt.addMonths(now, +1))],
        // years
        '올해': [dt.yearFirst(now), dt.yearLast(now)],
        '작년': [dt.addYears(dt.yearFirst(now), -1), dt.addYears(dt.yearLast(now), -1)],
        '내년': [dt.addYears(dt.yearFirst(now), +1), dt.addYears(dt.yearLast(now), +1)],
    };
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
    }
}

//이미지업로드
class UploadAdapter {
    constructor(loader, type) {
        this.loader = loader;
        this.type = type;
    }

    upload() {
        return this.loader.file.then( file => new Promise(((resolve, reject) => {
            this._initRequest();
            this._initListeners( resolve, reject, file );
            this._sendRequest( file );
        })))
    }

    abort() {
        if ( this.xhr ) { this.xhr.abort(); }
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', '/ckeditor/upload', true);
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const type = this.type
        const genericErrorText = '파일을 업로드 할 수 없습니다. \n파일용량은 3MB를 초과할수 없습니다.'

        xhr.addEventListener('error', () => {reject(genericErrorText)})
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const maxSize = 3500000;
            const response = xhr.response
            if(!response || response.error ||file.size > maxSize) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }

            resolve({
                default: response.url //업로드된 파일 주소
            })
        })
    }

    _sendRequest(file) {
        const data = new FormData()
        data.append('file', file);
        this.xhr.send(data)



    }
}




/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
    var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var	_ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d:    d,
                    dd:   pad(d),
                    ddd:  dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m:    m + 1,
                    mm:   pad(m + 1),
                    mmm:  dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy:   String(y).slice(2),
                    yyyy: y,
                    h:    H % 12 || 12,
                    hh:   pad(H % 12 || 12),
                    H:    H,
                    HH:   pad(H),
                    M:    M,
                    MM:   pad(M),
                    s:    s,
                    ss:   pad(s),
                    l:    pad(L, 3),
                    L:    pad(L > 99 ? Math.round(L / 10) : L),
                    t:    H < 12 ? "a"  : "p",
                    tt:   H < 12 ? "am" : "pm",
                    T:    H < 12 ? "A"  : "P",
                    TT:   H < 12 ? "AM" : "PM",
                    Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};





$(document).on("click", "button.popup_close", function () {
    $(".popup").fadeOut(100);
})






/* 다중 이미지업로드 미리보기 */
function readMultipleImage(input, targetId) {
    const multipleContainer = document.getElementById(targetId)

    if(input.files) {
        const fileArr = Array.from(input.files)
        fileArr.forEach((file, index) => {
            const $colDiv1 = document.createElement('div')
            $colDiv1.classList.add('opt_img')
            const reader = new FileReader()
            const $imgDiv = document.createElement('div')
            const $img = document.createElement('img')
            $img.classList.add('image')
            // const $label = document.createElement('label')
            // $label.classList.add('image-label')
            // $label.textContent = file.name
            $imgDiv.appendChild($img)
            // $imgDiv.appendChild($label)
            reader.onload = e => {
                $img.src = e.target.result
            }

            $colDiv1.appendChild($imgDiv)


            reader.readAsDataURL(file)
            multipleContainer.appendChild($colDiv1)

        })
    }
}


// input file에 change 이벤트 부여
// const inputImage = document.querySelectorAll(".input-image")
// inputImage.forEach ((el) => {
//     el.addEventListener("change", e => {
//         readImage(e.target)
//     })
// })
