const getConstants = () => {
    return {
        API_URL : process.env.NODE_ENV === "development" ? "https://vizion-api-t8wzz.ondigitalocean.app/api" : "https://vizion-api-t8wzz.ondigitalocean.app/api",
        // API_URL : process.env.NODE_ENV === "development" ? "https://mayfly-intimate-polliwog.ngrok-free.app/api" : "https://vizion-api-t8wzz.ondigitalocean.app/api",
        REGIMES : [
            { "name": "General de Ley Personas Morales", "value": "601", "type": "enterprise" },
            { "name": "Personas Morales con Fines no Lucrativos", "value": "603", "type": "enterprise" },
            { "name": "Sueldos y Salarios e Ingresos Asimilados a Salarios", "value": "605", "type": "particular" },
            { "name": "Arrendamiento", "value": "606", "type": "particular" },
            { "name": "Régimen de Enajenación o Adquisición de Bienes", "value": "607", "type": "particular" },
            { "name": "Demás ingresos", "value": "608", "type": "particular" },
            { "name": "Ingresos por Dividendos (socios y accionistas)", "value": "611", "type": "particular" },
            { "name": "Personas Físicas con Actividades Empresariales y Profesionales", "value": "612", "type": "particular" },
            { "name": "Ingresos por intereses", "value": "614", "type": "particular" },
            { "name": "Régimen de los ingresos por obtención de premios", "value": "615", "type": "particular" },
            { "name": "Sociedades Cooperativas de Producción que optan por diferir sus ingresos", "value": "620", "type": "enterprise" },
            { "name": "Incorporación Fiscal", "value": "621", "type": "particular" },
            { "name": "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras", "value": "622", "type": "enterprise" },
            { "name": "Opcional para Grupos de Sociedades", "value": "623", "type": "enterprise" },
            { "name": "Coordinados", "value": "624", "type": "enterprise" },
            { "name": "Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas", "value": "625", "type": "particular" },
            { "name": "Régimen Simplificado de Confianza", "value": "626", "type": "particular" }
        ],
    };
};

export default getConstants;