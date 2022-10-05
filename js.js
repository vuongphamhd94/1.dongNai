// "use strict";

// hover btn

$(".search--setting").hover(
  (el) => {
    let $this = $(el.target);
    $this.find(".icon").attr("class", "icon icon--sett2");
  },
  (el) => {
    let $this = $(el.target);
    $this.find(".icon").attr("class", "icon icon--sett");
  }
);

let tab_conten = $(".tab")[0];
let tab_thead = document.querySelector(".thead--tab");

let list_thead_tab = document.querySelectorAll(".thead--tab>div");

// hàm set chieu rong cot
let tab = {
  tab_size: () => {
    let list_thead_tab = $(".thead--tab>div");
    let tab_body_row = $(".body--tab>div");

    for (let i = 0; i < list_thead_tab.length; i++) {
      let width_col = list_thead_tab[i].getBoundingClientRect().width;
      width_col = width_col.toFixed(0);

      for (const row of tab_body_row) {
        row.querySelectorAll(".col")[i].style.width = width_col + "px";
      }
    }
  },
  setColNumber: () => {
    let titles = document.querySelectorAll(".thead--tab>div");
    let setCol = 1;
    for (const title of titles) {
      title.setAttribute("col", setCol);
      setCol++;
    }
  },
};

let tab_select = {
  selectable: () => {
    $("#container").selectable({
      stop: function () {
        $(".ui-selected", this).each(function () {
          if (this.querySelector("input").checked) {
            this.querySelector("input").checked = false;
          } else {
            this.querySelector("input").checked = true;
          }
        });
      },
      filter: ".row",
    });
  },
  destroy: () => {
    if (document.querySelector("#container").classList == "ui-selectable") {
      $("#container").selectable("destroy");
    }
  },
};

let sortColumn = (event, ui) => {
  let prevCol = Number(ui.item[0].getAttribute("col")) - 1;
  let newCol = 0;
  let titles = document.querySelectorAll(".thead--tab>div");
  if (titles[prevCol] == ui.item[0]) {
    return;
  } else {
    for (let title of titles) {
      if (title == ui.item[0]) {
        break;
      }

      newCol++;
    }
    let rows = document.querySelectorAll(".body--tab .row");

    for (let row of rows) {
      let cols = row.querySelectorAll(".col");
      let newHTML = "";

      if (newCol > prevCol) {
        for (let i = 0; i <= newCol; i++) {
          if (i == prevCol) {
            continue;
          }
          newHTML += `<div class='col'> ${cols[i].innerHTML}</div>`;
        }
        newHTML += `<div class='col'> ${cols[prevCol].innerHTML}</div>`;
        for (let i = newCol + 1; i < cols.length; i++) {
          if (i == cols.length - 1) {
            newHTML += `<div class='col optional'> ${cols[i].innerHTML}</div>`;
            break;
          }
          newHTML += `<div class='col'> ${cols[i].innerHTML}</div>`;
        }
      } else if (newCol == 0) {
        newHTML += `<div class='col'> ${cols[prevCol].innerHTML}</div>`;
        for (let i = 0; i < cols.length; i++) {
          if (i == prevCol) {
            continue;
          }
          if (i == cols.length - 1) {
            newHTML += `<div class='col optional'> ${cols[i].innerHTML}</div>`;
            break;
          }
          newHTML += `<div class='col'> ${cols[i].innerHTML}</div>`;
        }
      } else if (newCol < prevCol) {
        for (let i = 0; i < newCol; i++) {
          newHTML += `<div class='col'> ${cols[i].innerHTML}</div>`;
        }
        newHTML += `<div class='col'> ${cols[prevCol].innerHTML}</div>`;
        for (let i = newCol; i < cols.length; i++) {
          if (i == prevCol) {
            continue;
          }
          if (i == cols.length - 1) {
            newHTML += `<div class='col optional'> ${cols[i].innerHTML}</div>`;
            break;
          }
          newHTML += `<div class='col'> ${cols[i].innerHTML}</div>`;
        }
      }
      row.innerHTML = newHTML;
    }
  }

  tab.tab_size();
  tab.setColNumber();
};
let setting = {
  show: () => {
    $(".view--tab .tab--setting").popover({
      title: "Header",
      template: `<div class="view--setting">
        <div class="view--setting__search">
          <input type="text" placeholder="Tìm kiếm tên cột" />
        </div>
        <div class="view--setting__colShow">
          <div class="view--setting__title">
            <div class="view--setting__title__left">Hiện cột</div>
            <div class="view--setting__title__right">Ẩn tất cả</div>
          </div>
          <div class="view--setting__colName">
            <div>
              <div>
                <i class="icon icon--move2 move"></i>
                <div class="col--name" col="1">STT</div>
              </div>
              <i class="icon icon--show display"></i>

            </div>
  
            <div>
              <div>
                <i class="icon icon--move2 move"></i>
                <div class="col--name" col="2">Số, ký hiệu</div>
              </div>
              <i class="icon icon--show display"></i>
            </div>
  
            <div>
              <div>
                <i class="icon icon--move2 move"></i>
                <div class="col--name" col="3">tiêu đề hồ sơ</div>
              </div>
              <i class="icon icon--show display"></i>
            </div>
  
            <div>
              <div>
                <i class="icon icon--move2 move"></i>
                <div class="col--name" col="4">trạng thái</div>
              </div>
              <i class="icon icon--show display"></i>
            </div>
  
            <div>
              <div>
                <i class="icon icon--move2 move"></i>
                <div class="col--name" col="5">thơi gian bảo quản</div>
              </div>
              <i class="icon icon--show display"></i>
            </div>
  
            <div>
              <div>
                <i class="icon icon--move2 move"></i>
                <div class="col--name" col="6">số tờ/ số trang</div>
              </div>
              <i class="icon icon--show display"></i>
            </div>
  
            <div>
              <div>
                <i class="icon icon--move2 move"></i>
                <div class="col--name" col="7">đơn vị nộp lưu</div>
              </div>
              <i class="icon icon--show display"></i>
            </div>
          </div>
        </div>
        <div class="view--setting__colHide">
          <div class="view--setting__title">
            <div class="view--setting__title__left">Ẩn cột</div>
            <div class="view--setting__title__right">Hiện tất cả</div>
          </div>
  
          <div class="view--setting__colName">
            <div>
              <div>
                <i class="icon icon--move2 move"></i>

                <div class="col--name" col="8">thao tác nhanh</div>
              </div>
              <i class="icon icon--hide display"></i>
            </div>
          </div>
        </div>
        <div class="view--setting__quickAction">
          <div>
            <div>Dữ liệu xuống dòng</div>
            <div>
              <label class="switch">
                <input type="checkbox" id='wrap'/>
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div>
            <div>Thao tác nhanh</div>
            <div>
              <label class="switch">
                <input type="checkbox" checked />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>`,
      html: true,
      boundary: "viewport",
      placement: "bottom",
      offset: "-110px",
      sanitize: false,
    });
  },
  shown: () => {
    if (
      $(".view--tab .body--tab .row").attr("class").indexOf("text--nowrap") > -1
    ) {
      $(".view--setting #wrap").prop("checked", false);
    } else $(".view--setting #wrap").prop("checked", true);
  },
  destroyPopover: () => {
    $(".view--tab .tab--setting").popover("hide");
  },
  sort: () => {
    $(".view--setting__colName").sortable({
      axis: "y",
      stop: () => {
        $(".view--setting__colName").sortable("destroy");
      },
    });
  },
  destroySort: () => {
    if ($(".view--setting .ui-sortable-handle")) {
      $(".view--setting__colName").sortable("destroy");
    }
  },
  hover: (el) => {
    let $this = $(el.target).closest(".view--setting__colName>div");
    $this.find(".move").show();
    $this.mouseleave(() => {
      $this.find(".move").hide();
    });
  },
  removeShow: (el) => {
    let $this = $(el.target).closest(".view--setting__colName>div");
    $this.find(".display").attr("class", "icon icon--hide display");
    $(".view--setting .view--setting__colHide .view--setting__colName").prepend(
      `<div>${$this.html()}</div>`
    );
    $this.remove();
  },
  removeHide: (el) => {
    let $this = $(el.target).closest(".view--setting__colName>div");
    $this.find(".display").attr("class", "icon icon--show display");
    $(".view--setting .view--setting__colShow .view--setting__colName").prepend(
      `<div>${$this.html()}</div>`
    );
    $this.remove();
  },
  allShow: (el) => {
    let $this = $(el.target).closest(".view--setting__colHide");
    $this.find(".display").attr("class", "icon icon--show display");
    $(".view--setting .view--setting__colShow .view--setting__colName").prepend(
      $this.find(".view--setting__colName").html()
    );
    $this.find(".view--setting__colName>div").remove();
  },
  allhide: (el) => {
    let $this = $(el.target).closest(".view--setting__colShow");
    $this.find(".display").attr("class", "icon icon--hide display");
    $(".view--setting .view--setting__colHide .view--setting__colName").prepend(
      $this.find(".view--setting__colName").html()
    );
    $this.find(".view--setting__colName>div").remove();
  },
};
let rowEdit = {
  rowMouseenter: (el) => {
    let $this = $(el.target).closest(".row");
    $this.find(".optional").show();
    $this.find(".view--details").show();
    $this.find(".title--sub").hide();
  },
  rowMouseleave: (el) => {
    let $this = $(el.target);
    $(".optional").hide();
    $(".view--details").hide();
    $(".title--sub").show();
    if ($(".row--optional").length != 0) {
      $(".optional").popover("hide");
    }
  },
  show: () => {
    $(".optional").popover({
      title: "Header",
      template: `<div class="row--optional">
      <div class="row--optional__edit">
          <i class="icon icon--edit"></i> 
          <span>Chỉnh sửa</span>
      </div>
      <div class="row--optional__delete">
          <i class="icon icon--delete"></i>
          <span>Xoá dòng</span>
      </div>
      <div class="row--optional__send">
          <i class="icon icon--submit"></i>
          <span>Gửi duyệt</span>
      </div>
      <div class="row--optional__move">
          <i class="icon icon--move"></i>
          <span>Di chuyển</span>
      </div>

      </div>`,
      html: true,
      boundary: "viewport",
      placement: "bottom",
      offset: "-20px",
    });
  },
  prvShow: () => {
    // $(".body--tab> .row").off("mouseleave");
    $(".optional").popover("hide");
  },
  destroy: () => {
    $(".body--tab> .row").mouseleave((elOut) => {
      let $this = $(elOut.target);
      $(".optional").hide();
    });
    $(".optional").hide();
    $(".optional").popover("hide");
  },
  send: () => {
    alert("gui");
  },
  edit: () => {
    alert("sua");
  },
  delete: () => {
    alert("xoa");
  },
};

let tab_sort = {
  sort: () => {
    $(".thead--tab").sortable({
      axis: "x",
      stop: sortColumn,
    });
  },
};
// hàm set cot

//căn chiều rông các cột khi mở
tab.tab_size();
tab.setColNumber();
//căn chiều rông các cột khi thay đổi kích thước màn hình
window.addEventListener("resize", tab.tab_size);

// keo chieu rong

for (let el of list_thead_tab) {
  const resizer = el.querySelector(".resizer");
  if (resizer != null) {
    resizer.addEventListener("mousedown", mousedown);
  }

  function mousedown(e) {
    currentResizer = e.target;

    $(".thead--tab> .thead--tab--th").off();

    if ($(".thead--tab").attr("class").indexOf("ui-sortable") >= 0) {
      $(".thead--tab").sortable("destroy");
    }

    $("#container").addClass("cursor--w-resize");
    $(".thead--tab > div.thead--tab--th").addClass("cursor--w-resize");

    let prevX = e.clientX;

    let mousemove = (e) => {
      const rect = el.getBoundingClientRect();

      el.style.width = rect.width - (prevX - e.clientX) + "px";
      //them chieu rong bang
      tab_conten.style.width =
        tab_conten.getBoundingClientRect().width - (prevX - e.clientX) + "px";

      if ($(".thead--tab").width() > $(".container--view--tab").width()) {
        $(".view--tab").attr("class", "view--tab scroll");
      } else {
        $(".view--tab").attr("class", "view--tab");
      }

      tab.tab_size();
      prevX = e.clientX;
    };

    let mouseup = () => {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);

      $(".thead--tab> .thead--tab--th").mouseenter(() => {
        $(".thead--tab").sortable({
          axis: "x",
          stop: sortColumn,
        });
      });

      $("#container").removeClass("cursor--w-resize");
      $(".thead--tab > div.thead--tab--th").removeClass("cursor--w-resize");
      // kich hoat lai cau hinh hien thi

      $(".view--tab .tab--setting").mousemove(setting.show);
      $(".view--tab .tab--setting").on("shown.bs.popover", setting.shown);
    };

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);
  }
}

// hover vao dong
$(".body--tab> .row").mouseenter(rowEdit.rowMouseenter);

$(".body--tab> .row").mouseleave(rowEdit.rowMouseleave);

$(document).on("click", ".col.optional", () => {
  $(".body--tab> .row").off("mouseleave");
  $(document).on("mouseleave", ".col.optional", () => {
    $(".optional").hide();
    $(".view--details").hide();
    $(".body--tab> .row").mouseleave(rowEdit.rowMouseleave);
  });
});

/*Sắp xếp theo cột */

$(".thead--tab> .thead--tab--th").mouseenter(tab_sort.sort);

//keo chon

$(".view--tab").mousedown(tab_select.destroy);

$(".view--tab").mouseleave(tab_select.selectable);

$("#container").mouseenter(tab_select.selectable);

// chinh sua dong
$(".col.optional").mouseenter(rowEdit.show);

$(".optional").on("show.bs.popover", rowEdit.prvShow);

$(document).on("mouseleave", ".row--optional", rowEdit.destroy);

$(document).on("click", ".row--optional__send", rowEdit.send);
$(document).on("click", ".row--optional__delete", rowEdit.delete);
$(document).on("click", ".row--optional__edit", rowEdit.edit);

// cau hinh hien thi

$(".view--tab .tab--setting").mousemove(setting.show);
$(".view--tab .tab--setting").on("shown.bs.popover", setting.shown);

// khi di chuyen chuot ra ngoai tat cai dat cau hinh

$(document).on("mouseleave", ".view--setting", setting.destroyPopover);

//khi hover vao move thi kich hoatj sk sort
$(document).on("mousemove", ".view--setting .move", setting.sort);

// huy su kien sort trong setting
// $(document).on("mouseleave", ".view--setting .move", setting.destroySort);

// xuong dong hoac khong xuong dong
$(document).on("click", ".view--setting #wrap", (el) => {
  $(".view--tab .body--tab .row").toggleClass("text--nowrap");

  tab.tab_size();
});
// an hien cot
$(document).on(
  "click",
  ".view--setting .view--setting__colShow .display",
  setting.removeShow
);
$(document).on(
  "click",
  ".view--setting .view--setting__colHide .display",
  setting.removeHide
);

// an hien het tat ca

$(document).on(
  "click",
  ".view--setting .view--setting__colHide .view--setting__title__right",
  setting.allShow
);
$(document).on(
  "click",
  ".view--setting .view--setting__colShow .view--setting__title__right",
  setting.allhide
);
