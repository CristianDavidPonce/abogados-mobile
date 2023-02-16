import moment from 'moment'

export interface ILiquidacion {
  contratacion: string
  terminacion: string
  ultimaRemuneracion: string
  noPagado: string
  vacacionesNoGozadas: string
}
export interface IJubilacion {
  year1: string
  year2: string
  year3: string
  year4: string
  year5: string
  servicio: {
    years: string
    months: string
    days: string
  }
  edad: string
  sexo: 'M' | 'F'
}

export const liquidacion = (x: ILiquidacion) => {
  const dias = moment(x.terminacion).diff(moment(x.contratacion), 'day')
  const aniosIncompletos = dias / 365
  const aniosCompletos = Math.floor(dias / 365)
  const proporcional13 =
    (Number(x.ultimaRemuneracion) * 6 + Number(x.noPagado)) / 12
  const proporcional14 = (450 / 365) * 330
  const desahucio = (Number(x.ultimaRemuneracion) * aniosCompletos) / 4
  const despido =
    Number(x.ultimaRemuneracion) * Math.round(Number(aniosIncompletos))
  const total =
    Number(x.noPagado) +
    proporcional13 +
    proporcional14 +
    desahucio +
    despido +
    Number(x.vacacionesNoGozadas)
  return {
    proporcional13,
    proporcional14,
    desahucio,
    despido,
    total,
    vacacionesNo: Number(x.vacacionesNoGozadas),
    remuneraNo: Number(x.noPagado),
    aniosCompletos,
  }
}

export const jubilacion = (x: IJubilacion) => {
  const promedio =
    (Number(x.year1) +
      Number(x.year2) +
      Number(x.year3) +
      Number(x.year4) +
      Number(x.year5)) /
    5
  const edad = Number(x.edad)
  const year = Number(x.servicio.years)
  const month = Number(x.servicio.months)
  const day = Number(x.servicio.days)
  const porcentaje = promedio * 0.05
  const years = ((year * 365 + month * 30 + day) * year) / (year * 365)
  const coeficienteMensual =
    coeficientesMensuales.find((y) => y.edad === edad)?.value || 0.9473
  const coeficiente = coeficientesGlobales.find((y) => y.edad === edad)
  const coeficienteAnual =
    x.sexo === 'M' ? coeficiente?.hombre || 1 : coeficiente?.mujer || 1
  const fondoMensual = (porcentaje * years) / coeficienteMensual / 12
  const anual = fondoMensual * 12
  const catorce = 425
  const total = (anual + fondoMensual + catorce) * coeficienteAnual
  return {
    total,
    fondoMensual,
    coeficienteMensual,
    coeficienteAnual,
    years,
    anual,
  }
}

const coeficientesMensuales = [
  {
    edad: 39,
    value: 13.2782,
  },
  {
    edad: 40,
    value: 12.9547,
  },
  {
    edad: 41,
    value: 12.6232,
  },
  {
    edad: 42,
    value: 12.2863,
  },
  {
    edad: 43,
    value: 11.9424,
  },
  {
    edad: 44,
    value: 11.5919,
  },
  {
    edad: 45,
    value: 11.2374,
  },
  {
    edad: 46,
    value: 10.8753,
  },
  {
    edad: 47,
    value: 10.5084,
  },
  {
    edad: 48,
    value: 10.1378,
  },
  {
    edad: 49,
    value: 9.7658,
  },
  {
    edad: 50,
    value: 9.393,
  },
  {
    edad: 51,
    value: 9.0223,
  },
  {
    edad: 52,
    value: 8.6544,
  },
  {
    edad: 53,
    value: 8.2881,
  },
  {
    edad: 54,
    value: 7.9218,
  },
  {
    edad: 55,
    value: 7.5553,
  },
  {
    edad: 56,
    value: 7.1884,
  },
  {
    edad: 57,
    value: 6.8236,
  },
  {
    edad: 58,
    value: 6.4622,
  },
  {
    edad: 59,
    value: 6.111,
  },
  {
    edad: 60,
    value: 5.7728,
  },
  {
    edad: 61,
    value: 5.4525,
  },
  {
    edad: 62,
    value: 5.1468,
  },
  {
    edad: 63,
    value: 4.862,
  },
  {
    edad: 64,
    value: 4.594,
  },
  {
    edad: 65,
    value: 4.3412,
  },
  {
    edad: 66,
    value: 4.0991,
  },
  {
    edad: 67,
    value: 3.8731,
  },
  {
    edad: 68,
    value: 3.6622,
  },
  {
    edad: 69,
    value: 3.4663,
  },
  {
    edad: 70,
    value: 3.2849,
  },
  {
    edad: 71,
    value: 3.1195,
  },
  {
    edad: 72,
    value: 2.9731,
  },
  {
    edad: 73,
    value: 2.8502,
  },
  {
    edad: 74,
    value: 2.7412,
  },
  {
    edad: 75,
    value: 2.6455,
  },
  {
    edad: 76,
    value: 2.5596,
  },
  {
    edad: 77,
    value: 2.4819,
  },
  {
    edad: 78,
    value: 2.4115,
  },
  {
    edad: 79,
    value: 2.3418,
  },
  {
    edad: 80,
    value: 2.2787,
  },
  {
    edad: 81,
    value: 2.2139,
  },
  {
    edad: 82,
    value: 2.1384,
  },
  {
    edad: 83,
    value: 2.0704,
  },
  {
    edad: 84,
    value: 1.9633,
  },
  {
    edad: 85,
    value: 1.835,
  },
  {
    edad: 86,
    value: 1.6842,
  },
  {
    edad: 87,
    value: 1.4769,
  },
  {
    edad: 88,
    value: 1.2141,
  },
  {
    edad: 89,
    value: 0.9473,
  },
]

const coeficientesGlobales = [
  {
    edad: 39,
    hombre: 14.7071452696247,
    mujer: 15.660162993705,
  },
  {
    edad: 40,
    hombre: 14.545783834462,
    mujer: 15.5134928645539,
  },
  {
    edad: 41,
    hombre: 14.3780636606672,
    mujer: 15.3606832299706,
  },
  {
    edad: 42,
    hombre: 14.2039168300576,
    mujer: 15.2016154601212,
  },
  {
    edad: 43,
    hombre: 14.023244985281,
    mujer: 15.0361395189299,
  },
  {
    edad: 44,
    hombre: 13.8359839714562,
    mujer: 14.8641352926554,
  },
  {
    edad: 45,
    hombre: 13.6417235909293,
    mujer: 14.6854966527256,
  },
  {
    edad: 46,
    hombre: 13.4414334922322,
    mujer: 14.5001151914958,
  },
  {
    edad: 47,
    hombre: 13.2341271426373,
    mujer: 14.307925043392,
  },
  {
    edad: 48,
    hombre: 13.0201479127562,
    mujer: 14.1088418652809,
  },
  {
    edad: 49,
    hombre: 12.7995189874534,
    mujer: 13.9028213311575,
  },
  {
    edad: 50,
    hombre: 12.5723124422797,
    mujer: 13.6898438299088,
  },
  {
    edad: 51,
    hombre: 12.3386035237146,
    mujer: 13.4699137421237,
  },
  {
    edad: 52,
    hombre: 12.098548543789,
    mujer: 13.2430296512034,
  },
  {
    edad: 53,
    hombre: 11.8522804115534,
    mujer: 13.009269372419,
  },
  {
    edad: 54,
    hombre: 11.5999850548637,
    mujer: 12.7687053287961,
  },
  {
    edad: 55,
    hombre: 11.3419201974385,
    mujer: 12.5214318425297,
  },
  {
    edad: 56,
    hombre: 11.0783160325543,
    mujer: 12.2676205928751,
  },
  {
    edad: 57,
    hombre: 10.8094815141595,
    mujer: 12.0074401288345,
  },
  {
    edad: 58,
    hombre: 10.5357686732994,
    mujer: 11.74112411279,
  },
  {
    edad: 59,
    hombre: 10.2575522071424,
    mujer: 11.4688940710584,
  },
  {
    edad: 60,
    hombre: 9.9752246456761,
    mujer: 11.1910800966105,
  },
  {
    edad: 61,
    hombre: 9.689250948799,
    mujer: 10.9080100794219,
  },
  {
    edad: 62,
    hombre: 9.4001293083844,
    mujer: 10.6200534390777,
  },
  {
    edad: 63,
    hombre: 9.108367303776,
    mujer: 10.3276292860881,
  },
  {
    edad: 64,
    hombre: 8.8145162251065,
    mujer: 10.0311921384238,
  },
  {
    edad: 65,
    hombre: 8.5191698697899,
    mujer: 9.7312575717992,
  },
  {
    edad: 66,
    hombre: 8.2229398146747,
    mujer: 9.4283460613669,
  },
  {
    edad: 67,
    hombre: 7.9264607706664,
    mujer: 9.1230260081174,
  },
  {
    edad: 68,
    hombre: 7.6303725151281,
    mujer: 8.815914732572,
  },
  {
    edad: 69,
    hombre: 7.3353600645822,
    mujer: 8.5076487670893,
  },
  {
    edad: 70,
    hombre: 7.0420891702262,
    mujer: 8.198893466582,
  },
  {
    edad: 71,
    hombre: 6.7512479506573,
    mujer: 7.8903229590226,
  },
  {
    edad: 72,
    hombre: 6.4634932745696,
    mujer: 7.5826635546594,
  },
  {
    edad: 73,
    hombre: 6.1795319246366,
    mujer: 7.2766037691052,
  },
  {
    edad: 74,
    hombre: 5.8999847658477,
    mujer: 6.9728892162472,
  },
  {
    edad: 75,
    hombre: 5.6254981783944,
    mujer: 6.6722408997655,
  },
  {
    edad: 76,
    hombre: 5.3566937091855,
    mujer: 6.375369794471,
  },
  {
    edad: 77,
    hombre: 5.0941569889908,
    mujer: 6.0829908339111,
  },
  {
    edad: 78,
    hombre: 4.8384009950357,
    mujer: 5.7957938069556,
  },
  {
    edad: 79,
    hombre: 4.5899602914162,
    mujer: 5.5144301857867,
  },
  {
    edad: 80,
    hombre: 4.349253278532,
    mujer: 5.2395266994867,
  },
  {
    edad: 81,
    hombre: 4.1167247853453,
    mujer: 4.9716707344733,
  },
  {
    edad: 82,
    hombre: 3.8926793150047,
    mujer: 4.7114211328687,
  },
  {
    edad: 83,
    hombre: 3.6774518820252,
    mujer: 4.4592493034937,
  },
  {
    edad: 84,
    hombre: 3.4712726224169,
    mujer: 4.2155865692026,
  },
  {
    edad: 85,
    hombre: 3.2743153349072,
    mujer: 3.9808320027907,
  },
  {
    edad: 86,
    hombre: 3.0867022445848,
    mujer: 3.7552387708613,
  },
  {
    edad: 87,
    hombre: 2.9084665627636,
    mujer: 3.5390468388572,
  },
  {
    edad: 88,
    hombre: 2.7396808917987,
    mujer: 3.3324068477164,
  },
  {
    edad: 89,
    hombre: 2.5802315612019,
    mujer: 3.1352947188328,
  },
  {
    edad: 90,
    hombre: 2.4299568783935,
    mujer: 2.9476088866279,
  },
  {
    edad: 91,
    hombre: 2.2888362247098,
    mujer: 2.7689702035416,
  },
  {
    edad: 92,
    hombre: 2.1563493604322,
    mujer: 2.5987908048957,
  },
  {
    edad: 93,
    hombre: 2.0317544123869,
    mujer: 2.435740939305,
  },
  {
    edad: 94,
    hombre: 1.914133365288,
    mujer: 2.27741430678,
  },
  {
    edad: 95,
    hombre: 1.8015746289406,
    mujer: 2.1192742420529,
  },
  {
    edad: 96,
    hombre: 1.6874557435719,
    mujer: 1.9516160498006,
  },
  {
    edad: 97,
    hombre: 1.5602953859938,
    mujer: 1.7537118047494,
  },
  {
    edad: 98,
    hombre: 1.3742057673509,
    mujer: 1.4767923729504,
  },
  {
    edad: 99,
    hombre: 1.0,
    mujer: 1.0,
  },
]
