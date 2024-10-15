interface ICaja {
    dia: string;
    mes: string;
    año: string;
    dibujaCaja(): string;
}

class CajaCalendario implements ICaja {
    dia: string;
    mes: string;
    año: string;

    constructor(dia: string, mes: string, año: string) {
        this.dia = dia;
        this.mes = mes;
        this.año = año;
    }

    dibujaCaja(): string {
        return `
            <div class="caja-calendario">
                <p>${this.dia} ${this.mes}/${this.año}</p>
            </div>
        `;
    }
}

class CajaEspecial extends CajaCalendario {
    img: string;
    evento: string;

    constructor(dia: string, mes: string, año: string, img: string, evento: string) {
        super(dia, mes, año);
        this.img = img;
        this.evento = evento;
    }

    dibujaCaja(): string {
        return `
            <div class="caja-calendario">
                <p>${this.dia} ${this.mes}/${this.año}</p>
                <p>${this.evento}</p>
                <img src="${this.img}" alt="Evento imagen">
                <a class="a-block" href="#eventos">Ver más</a>
            </div>
        `;
    }
}

function cargarDatos(): void {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const calendarioElement = document.getElementById('calendario')!;
            data.cajas.forEach((caja: any) => {
                let cajaHTML;
                if (caja.img && caja.evento) {
                    const cajaEspecial = new CajaEspecial(caja.dia, caja.mes, caja.año, caja.img, caja.evento);
                    cajaHTML = cajaEspecial.dibujaCaja();
                } else {
                    const cajaCalendario = new CajaCalendario(caja.dia, caja.mes, caja.año);
                    cajaHTML = cajaCalendario.dibujaCaja();
                }
                calendarioElement.innerHTML += cajaHTML;
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

cargarDatos();
