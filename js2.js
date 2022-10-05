// "use strict";
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
    };

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);
  }
}
// kết thúc căn chỉnh chiều rông

// let rowNumber = (event, ui) => {
//   let rows = document.querySelectorAll(".body--tab> .row");
//   let stt = 1;
//   // debugger;
//   for (let row of rows) {
//     row.querySelector(".colNumber > div").textContent = stt++;
//   }

//   $(".body--tab").sortable("destroy");
// };

// cai dat

$(".body--tab> .row").mouseenter((elIn) => {
  let $this = $(elIn.target).closest(".row");
  $this.find(".optional").show();
});

$(".body--tab> .row").mouseleave((elOut) => {
  let $this = $(elOut.target);
  $(".optional").hide();
});

// bắt đầu sắp xếp dòng
/*


$(".body--tab> .row .move").mouseenter(() => {
  $(".body--tab").sortable({
    axis: "y",
    stop: rowNumber,
  });
});

*/
/*Sắp xếp theo cột */

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

$(".thead--tab> .thead--tab--th").mouseenter(() => {
  $(".thead--tab").sortable({
    axis: "x",
    stop: sortColumn,
  });
});

//keo chon
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

$(".view--tab").mousedown(
  tab_select.destroy
  //   () => {
  //   if (document.querySelector("#container").classList == "ui-selectable") {
  //     $("#container").selectable("destroy");
  //   }
  // }
);

$(".view--tab").mouseleave(
  tab_select.selectable
  //   () => {
  //   $("#container").selectable({
  //     stop: function () {
  //       $(".ui-selected", this).each(function () {
  //         if (this.querySelector("input").checked) {
  //           this.querySelector("input").checked = false;
  //         } else {
  //           this.querySelector("input").checked = true;
  //         }
  //       });
  //     },
  //     filter: ".row",
  //   });
  // }
);

$("#container").mouseenter(tab_select.selectable);

// $(function () {
//   $("#container").selectable({
//     stop: function () {
//       $(".ui-selected", this).each(function () {
//         if (this.querySelector("input").checked) {
//           this.querySelector("input").checked = false;
//         } else {
//           this.querySelector("input").checked = true;
//         }
//       });
//     },
//     filter: ".row",
//   });
// });

$(".col.optional").mouseenter(function () {
  $(".optional").popover({
    title: "Header",
    template:
      '<div class="row--optional"><div class="row--optional__edit"><span class="material-icons"> edit </span><span>Chỉnh sửa</span></div><div class="row--optional__delete"><span class="material-icons"> delete_outline </span><span>Xoá dòng</span></div><div class="row--optional__send"><span class="material-icons"> send </span><span>Gửi duyệt</span></div></div>',
    html: true,
    boundary: "viewport",
    placement: "bottom",
    offset: "-20px",
  });
});

$(".optional").on("show.bs.popover", () => {
  $(".body--tab> .row").off("mouseleave");
  $(".optional").popover("hide");
});

$(document).on("mouseleave", ".row--optional", () => {
  $(".body--tab> .row").mouseleave((elOut) => {
    let $this = $(elOut.target);
    $(".optional").hide();
  });
  $(".optional").hide();
  $(".optional").popover("hide");
});

$(document).on("click", ".row--optional__send", () => {
  console.log("gui");
});
