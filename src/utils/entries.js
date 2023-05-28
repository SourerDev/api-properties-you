module.exports = {
  PropertyType: {
    HOUSE: 'house',
    PH: 'ph',
    APARTMENT: 'apartment',
    RANCH: 'ranch',
  },
  requiredPropertyEntries: {
    common: [
      'address',
      'idCity',
      'description',
      'photos',
      'bedrooms',
      'bathrooms',
      'squareMeters',
      'yearBuilt',
      'type',
    ],
    house: ['garage'],
    ph: ['floorNumber', 'balcony'],
    apartment: ['floorNumber', 'balcony'],
    ranch: ['acreage', 'barn'],
  },
  requiredPublicationEntries: {},
  checkRequiredPropertyEntries: (PROPERTY) => {
    const {
      idCity,
      address,
      photos,
      bedrooms,
      bathrooms,
      squareMeters,
      yearBuilt,
      description,
      idUser,
      type,
    } = PROPERTY
    const { common, house, ph, apartment, ranch } = this.requiredPropertyEntries

    const { HOUSE, PH, APARTMENT, RANCH } = this.PropertyType

    if (
      ![
        idCity,
        address,
        photos,
        bedrooms,
        bathrooms,
        squareMeters,
        yearBuilt,
        description,
        idUser,
        type,
      ].every(Boolean)
    )
      return {
        missing: true,
        message: `Missing data → ${common.join(', ')} are required`,
      }

    const PROPERTY_TYPE = type.type

    if (PROPERTY_TYPE === HOUSE) {
      for (let i = 0; i < house.length; i++) {
        if (!type.hasOwnProperty(house[i])) {
          return {
            missing: true,
            message: `Missing data → ${house.join(', ')} are required`,
          }
        }
      }
    } else if (PROPERTY_TYPE === PH) {
      for (let i = 0; i < ph.length; i++) {
        if (!type.hasOwnProperty(ph[i])) {
          return {
            missing: true,
            message: `Missing data → ${ph.join(', ')} are required`,
          }
        }
      }
    } else if (PROPERTY_TYPE === APARTMENT) {
      for (let i = 0; i < apartment.length; i++) {
        if (!type.hasOwnProperty(apartment[i])) {
          return {
            missing: true,
            message: `Missing data → ${apartment.join(', ')} are required`,
          }
        }
      }
    }

    return [HOUSE, PH, APARTMENT].includes(PROPERTY_TYPE)
      ? {
        missing: false,
      }
      : {
        missing: true,
        message: `Type property ${PROPERTY_TYPE} no valid`,
      }
  },
  checkRequiredPublicationEntries: (PUBLISH) => {
    const { idProperty, idUser, price, modality } = PUBLISH
    if (![idProperty, idUser, price, modality].every(Boolean))
      return {
        missing: true,
        message:
          'Missing data → idProperty, idUser, price, modality are required',
      }

    return {
      missing: false,
      message: { msg: 'all is correct', temp: PUBLISH },
    }
  },
}

/*
    state: string, // Estado o provincia donde se encuentra la propiedad
    zip_code: string, // Código postal de la propiedad
    price: number, // Precio de venta o alquiler de la propiedad
*/
/*
{
    common:{
        idProperty:string, // Identificación única de la propiedad
        address:string, // Dirección de la propiedad
        idCity: number, // Ciudad donde se encuentra la propiedad
        geolocation:json
        description:string, // Descripción de la propiedad
        photos:string[], // Lista de URLs de las fotos de la propiedad
        bedrooms:number, // Número de habitaciones en la propiedad
        bathrooms:number, // Número de baños en la propiedad
        squareMeters: number, // Área en metros cuadrados de la propiedad
        yearBuilt:number, // Año de construcción de la propiedad
        amenities:string[], // Lista de comodidades o servicios disponibles en la propiedad
        type:enum //Enum de tipos de propiedad
    },
    house:{
        stories: number, // Número de pisos de la casa
        garage: boolean, // Indica si la casa tiene cochera o garaje
        backyard: boolean, // Indica si la casa tiene patio trasero
        pool: boolean, // Indica si la casa tiene piscina
    },
    ph:{
        floorNumber: number, // Número de piso del PH
        elevator: boolean, // Indica si el PH tiene ascensor
        balcony: boolean, // Indica si el PH tiene balcón
        gym: boolean, // Indica si el PH tiene gimnasio
    },
    apartment:{
        floorNumber: number, // Número de piso del apartamento
        elevator: boolean, // Indica si el apartamento tiene ascensor
        balcony: boolean, // Indica si el apartamento tiene balcón
        gym: boolean, // Indica si el apartamento tiene gimnasio
    },
    ranch:{
        acreage: number, // Área en acres
        barn: boolean, // Indica si tiene establo
        pasture: boolean, // Indica si tiene pastizales
        pond: boolean, // Indica si tiene un estanque
    }
}
*/
