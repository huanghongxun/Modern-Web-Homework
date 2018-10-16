$(document).ready(function() {
    $("table th")
        .click(function() {
            $(this).siblings().removeAttr('sort');
            let now = $(this).attr('sort');
            let f;
            if (now == 'up')
            {
                $(this).attr('sort', 'down');
                f = -1;
            }
            else
            {
                $(this).attr('sort', 'up');
                f = 1;
            }

            let idx = $(this).index();
            let tbody = $(this).closest("table")
                .children("tbody");
            let trs = tbody.children("tr");
            
            trs.sort(function(a, b) {
                let A = $(a).children("td").eq(idx).text();
                let B = $(b).children("td").eq(idx).text();

                if (A == B) return 0;
                else if (A > B) return f;
                else return -f;
            });

            trs.detach().appendTo(tbody);
        });
});
