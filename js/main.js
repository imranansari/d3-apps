(function (g, d3) {
    'use strict';

    /**
     * 1. Обойти массив groups и создать общую архитектуру дерева
     * 2. Обойти массив nodes и в архитектуру добавить узлы
     * 3. Добавить ссылки между узлами
     */

    d3.selection.prototype.position = function () {

        var el = this.node();
        var elPos = el.getBoundingClientRect();
        var vpPos = getVpPos(el);

        function getVpPos(el) {
            if (el.parentElement.tagName === 'svg') {
                return el.parentElement.getBoundingClientRect();
            }
            return getVpPos(el.parentElement);
        }

        return {
            top: elPos.top - vpPos.top,
            left: elPos.left - vpPos.left,
            width: elPos.width,
            bottom: elPos.bottom - vpPos.top,
            height: elPos.height,
            right: elPos.right - vpPos.left
        };

    };

    d3.json('fixture/structure.json', function (json) {
        var nodes = json.nodes.sort(function (a, b) {
                if (a.id == null) {
                    return -1
                } else if (b.id == null) {
                    return 1;
                } else {
                    return a.id - b.id;
                }
            }),
            links = [],
            nodeRelationsCache = {};

        for (var i = 0, j = nodes.length; i < j; i++) {
            var _node = nodes[i];
            for (var k = 0, l = _node.relationships.length; k < l; k++) {
                var target = _node.relationships[k].target;
                if(!nodeRelationsCache.hasOwnProperty(target)) {
                    null;
                } else {
                    nodeRelationsCache[target].push(_node);
                }
            }
        }

        console.log(nodes);
    });
})(window, d3);