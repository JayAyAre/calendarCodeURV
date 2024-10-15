var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CajaCalendario = /** @class */ (function () {
    function CajaCalendario(dia, mes, año) {
        this.dia = dia;
        this.mes = mes;
        this.año = año;
    }
    CajaCalendario.prototype.dibujaCaja = function () {
        return "\n            <div class=\"caja-calendario\">\n                <p>".concat(this.dia, " ").concat(this.mes, "/").concat(this.año, "</p>\n            </div>\n        ");
    };
    return CajaCalendario;
}());
var CajaEspecial = /** @class */ (function (_super) {
    __extends(CajaEspecial, _super);
    function CajaEspecial(dia, mes, año, img, evento) {
        var _this = _super.call(this, dia, mes, año) || this;
        _this.img = img;
        _this.evento = evento;
        return _this;
    }
    CajaEspecial.prototype.dibujaCaja = function () {
        return "\n            <div class=\"caja-calendario\">\n                <p>".concat(this.dia, " ").concat(this.mes, "/").concat(this.año, "</p>\n                <p>").concat(this.evento, "</p>\n                <img src=\"").concat(this.img, "\" alt=\"Evento imagen\">\n                <a href=\"#eventos\">Ver m\u00E1s</a>\n            </div>\n        ");
    };
    return CajaEspecial;
}(CajaCalendario));
function cargarDatos() {
    fetch('data.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var calendarioElement = document.getElementById('calendario');
        data.cajas.forEach(function (caja) {
            var cajaHTML;
            if (caja.img && caja.evento) {
                var cajaEspecial = new CajaEspecial(caja.dia, caja.mes, caja.año, caja.img, caja.evento);
                cajaHTML = cajaEspecial.dibujaCaja();
            }
            else {
                var cajaCalendario = new CajaCalendario(caja.dia, caja.mes, caja.año);
                cajaHTML = cajaCalendario.dibujaCaja();
            }
            calendarioElement.innerHTML += cajaHTML;
        });
    })
        .catch(function (error) { return console.error('Error al cargar los datos:', error); });
}
cargarDatos();
