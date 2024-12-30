const getConstants = () => {
    return {
        API_URL : process.env.NODE_ENV === "development" ? "https://vizion-api-t8wzz.ondigitalocean.app/api" : "https://vizion-api-t8wzz.ondigitalocean.app/api",
        MAPBOX_TOKEN : "pk.eyJ1IjoiY29yZS12aXppb24iLCJhIjoiY20ycGQ4b2dwMHQ1cjJrb204a25iZHR3cyJ9.Z5XS7M19N8FcGHahQ9dgiw",
        REGIMES : [
            { "name": "General de Ley Personas Morales", "value": "601FILTER_NUMBERS_CRITERIA", "type": "enterprise" },
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
        FILTER_NUMBERS_CRITERIA : [
            {
              label : "Es Igual A",
              value : "$eq",
              icon : "Equals"
            },
            {
              label : "No Es Igual A",
              value : "$ne",
              icon : "NotEquals"
            },
            {
              label : "Es Menor A",
              value : "$lt",
              icon : "LessThan"
            },
            {
              label : "Menor o Igual A",
              value : "$lte",
              icon : "LessThanOrEqual"
            },
            {
              label : "Es Mayor A",
              value : "$gt",
              icon : "GreaterThan"
            },
            {
              label : "Mayor o Igual A",
              value : "$gte",
              icon : "GreaterThanOrEqual"
            },
        ],
        FILTERS_ENTITY_CRITERIA : [
            {
              label : "Es Igual A",
              value : "$in",
              icon : "Equals"
            },
            {
              label : "No Es Igual A",
              value : "$notIn",
              icon : "NotEquals"
            },
            {
              label : "Está Definido",
              value : "$notNull",
              icon : "CheckCircle"
            },
            {
              label : "No Está Definido",
              value : "$null",
              icon : "CircleDashed"
            },
        ],
    };
};

export default getConstants;