(function () {
  var $ = function (s, r) {
      return (r || document).querySelector(s);
    },
    $$ = function (s, r) {
      return [].slice.call((r || document).querySelectorAll(s));
    };
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  /* hero words */
  var h = $("#h1"),
    t = h.textContent.trim().split(" "),
    html = "";
  t.forEach(function (w, i) {
    var em = w.indexOf("лого") === 0 || w.indexOf("сè") === 0;
    html +=
      '<span class="w"><i style="--i:' +
      i +
      '">' +
      (em ? "<em>" + w + "</em>" : w) +
      "</i></span> ";
  });
  h.innerHTML = html;
  /* burst lines */
  function burst(id, n) {
    var g = "";
    for (var i = 0; i < n; i++)
      g +=
        '<line y1="-44" y2="44" transform="rotate(' +
        (i * 180) / n +
        ')" style="stroke:#55A774;stroke-width:' +
        (id == "bl" ? 9 : 12) +
        '"/>';
    $("#" + id).innerHTML = g;
  }
  burst("bl", 8);
  burst("bl2", 8);
  /* grid */
  var gs = "";
  for (var x = 0; x <= 1200; x += 100)
    gs +=
      '<line x1="' +
      x +
      '" y1="0" x2="' +
      x +
      '" y2="800" style="animation-delay:' +
      (x / 1200) * 0.8 +
      's"/>';
  for (var y = 0; y <= 800; y += 100)
    gs +=
      '<line x1="0" y1="' +
      y +
      '" x2="1200" y2="' +
      y +
      '" style="animation-delay:' +
      ((y / 800) * 0.8 + 0.2) +
      's"/>';
  $("#gsv").innerHTML = gs;
  /* marquee */
  var m = [
      "Маици",
      "Шолји",
      "Торби",
      "Тефтери",
      "Лого печат",
      "Подароци за клиенти",
      "Униформи",
      "Налепници",
    ],
    ms = "";
  for (var k = 0; k < 4; k++)
    m.forEach(function (x) {
      ms += "<span>" + x + "</span>";
    });
  $("#mq").innerHTML = ms;
  /* products */
  var P = [
    [
      "Маици и дуксери",
      "Твоето лого на облека за тимот или за клиентите.",
      '<path d="M8 6 3 9l2 4 3-1v9h8v-9l3 1 2-4-5-3c-1 2-7 2-8 0z"/>',
    ],
    [
      "Шолји",
      "Секое утро твојот бренд пред очи на клиентите.",
      '<path d="M4 8h13v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 5h-2M8 3v2M12 3v2"/>',
    ],
    [
      "Торби",
      "Платнени торби кои го шират твоето име низ градот.",
      '<path d="M5 8h14l1 13H4zM9 8V6a3 3 0 0 1 6 0v2"/>',
    ],
    [
      "Тефтери и пенкала",
      "Канцелариски производи со твој потпис.",
      '<path d="M6 3h12v18H6zM6 7h-2M6 12H4M6 17H4M10 8h5"/>',
    ],
    [
      "Налепници и етикети",
      "Мали детали кои го прават пакувањето посебно.",
      '<path d="M4 4h16v10l-6 6H4zM14 20v-6h6"/>',
    ],
    [
      "И многу повеќе",
      "Имаш друга идеја? Прашај нè и ќе најдеме решение.",
      '<path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18"/>',
    ],
  ];
  $("#pg").innerHTML = P.map(function (p, i) {
    return (
      '<div class="pc" data-a="up" style="--d:' +
      i +
      '"><div class="ic"><svg viewBox="0 0 24 24">' +
      p[2] +
      "</svg></div><h3>" +
      p[0] +
      "</h3><p>" +
      p[1] +
      "</p></div>"
    );
  }).join("");
  /* tilt */
  if (!reduce && matchMedia("(hover:hover)").matches)
    $$(".pc").forEach(function (c) {
      c.addEventListener("mousemove", function (e) {
        var r = c.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform =
          "perspective(700px) rotateY(" +
          x * 10 +
          "deg) rotateX(" +
          -y * 10 +
          "deg) translateY(-6px)";
      });
      c.addEventListener("mouseleave", function () {
        c.style.transform = "";
      });
    });
  /* configurator */
  var ink = "#55A774",
    base = { tee: "#ffffff", mug: "#ffffff", bag: "#F3E7D3", book: "#ffffff" },
    cur = "tee";
  var inks = ["#55A774", "#1F2A27", "#E0566B", "#2F6FDE", "#E8A317", "#ffffff"],
    bases = ["#ffffff", "#F3E7D3", "#1F2A27", "#B7D6C9", "#F6D3D6", "#E9C46A"];
  function sw(id, arr, fn, def) {
    $(id).innerHTML = arr
      .map(function (c, i) {
        return (
          '<button style="background:' +
          c +
          '" aria-label="' +
          c +
          '" data-c="' +
          c +
          '" class="' +
          (i == def ? "on" : "") +
          '"></button>'
        );
      })
      .join("");
    $$(id + " button").forEach(function (b) {
      b.onclick = function () {
        $$(id + " button").forEach(function (x) {
          x.classList.remove("on");
        });
        b.classList.add("on");
        fn(b.dataset.c);
      };
    });
  }
  function logo() {
    var n = $("#nm").value || "Твој Бизнис",
      s = n.length > 9 ? 20 : 28,
      g = "";
    for (var i = 0; i < 8; i++)
      g +=
        '<line y1="-22" y2="22" transform="rotate(' +
        i * 22.5 +
        ')" stroke="' +
        ink +
        '" stroke-width="4"/>';
    return (
      '<g transform="translate(0 -22) scale(1)">' +
      g +
      '</g><text y="32" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="' +
      s +
      '" fill="' +
      ink +
      '">' +
      n.replace(/&/g, "&amp;").replace(/</g, "&lt;") +
      "</text>"
    );
  }
  function draw() {
    $$(".pr").forEach(function (g) {
      g.innerHTML = logo();
    });
    var s = $(".pv.on"),
      bs = s.querySelector("[fill]");
  }
  function paint() {
    var s = $("[data-p=" + cur + "].pv");
    var els = { tee: "#tp", mug: "rect", bag: "rect", book: "rect" };
    var e = s.querySelector(els[cur]);
    e.setAttribute("fill", base[cur]);
  }
  sw(
    "#sw",
    inks,
    function (c) {
      ink = c;
      draw();
    },
    0,
  );
  sw(
    "#sw2",
    bases,
    function (c) {
      base[cur] = c;
      paint();
    },
    0,
  );
  $("#nm").oninput = draw;
  $$("#tabs button").forEach(function (b) {
    b.onclick = function () {
      $$("#tabs button").forEach(function (x) {
        x.classList.remove("on");
      });
      b.classList.add("on");
      cur = b.dataset.p;
      $$(".pv").forEach(function (v) {
        v.classList.toggle("on", v.dataset.p == cur);
      });
      paint();
      draw();
    };
  });
  draw();
  /* theme */
  var th = $("#tg"),
    root = document.documentElement;
  th.onclick = function () {
    var d = root.dataset.theme
      ? root.dataset.theme == "dark"
      : matchMedia("(prefers-color-scheme:dark)").matches;
    root.dataset.theme = d ? "light" : "dark";
    th.textContent = d ? "☾" : "☀";
  };
  /* nav */
  var ham = $("#ham"),
    lk = $("#links");
  ham.onclick = function () {
    ham.classList.toggle("on");
    lk.classList.toggle("on");
  };
  $$("#links a").forEach(function (a) {
    a.onclick = function () {
      ham.classList.remove("on");
      lk.classList.remove("on");
    };
  });
  /* scroll */
  var nav = $("#nav"),
    bar = $("#bar"),
    st = $("#st"),
    gb = $("#gb");
  function sc() {
    var y = scrollY,
      hgt = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("s", y > 20);
    bar.style.width = (y / hgt) * 100 + "%";
    if (!reduce) gb.style.transform = "translateY(" + y * 0.15 + "px)";
    var r = st.getBoundingClientRect();
    st.style.setProperty(
      "--p",
      Math.max(0, Math.min(1, (innerHeight * 0.8 - r.top) / (r.height + 60))),
    );
  }
  addEventListener("scroll", sc, { passive: true });
  sc();
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
  );
  $$("[data-a]").forEach(function (e) {
    io.observe(e);
  });
  var io2 = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          $("#bf").classList.add("in");
        }
      });
    },
    { threshold: 0.3 },
  );
  io2.observe($("#bf"));
  /* counters */
  $$("[data-c]").forEach(function (n) {
    var to = +n.dataset.c,
      o = new IntersectionObserver(
        function (es) {
          if (es[0].isIntersecting) {
            o.disconnect();
            var t0 = performance.now();
            (function f(t) {
              var p = Math.min(1, (t - t0) / 1400);
              n.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
              if (p < 1) requestAnimationFrame(f);
            })(t0);
          }
        },
        { threshold: 0.6 },
      );
    o.observe(n);
  });
  /* seal parallax */
  var seal = $("#seal");
  if (!reduce && matchMedia("(hover:hover)").matches)
    addEventListener("mousemove", function (e) {
      var x = (e.clientX / innerWidth - 0.5) * 16,
        y = (e.clientY / innerHeight - 0.5) * 16;
      seal.style.translate = x + "px " + y + "px";
    });
})();
