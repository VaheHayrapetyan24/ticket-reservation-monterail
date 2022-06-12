import eventConfiguration from '../../db/defaultData/venueConfiguration.json';

/**
 * Mock for external service for storing configurations (E.g. Contentstack)
 *
 * The configuration data example
 *
 *  {
 *    isles: [
 *      // isle number is array index + 1
 *      {
 *        rowCount: 10,
 *        seatCount: 10
 *      }
 *    ]
 *  }
 *
 */
export interface IIsleConfiguration {
  rowCount: number;
  seatCount: number;
}

export interface IVenueConfiguration {
  id: string;
  aisles: IIsleConfiguration[];
}

const exampleConfig: IVenueConfiguration = {
  id: 'randomVenueId',
  aisles: [
    {
      rowCount: 10,
      seatCount: 10,
    },
    {
      rowCount: 20,
      seatCount: 20,
    },
  ],
};

export class ConfigurationNotFound extends Error {}

export class VenueConfiguration {
  // if the actual implementation made a request to an external service we could cache the result
  static async getConfigurationById(
    configurationId: string,
  ): Promise<IVenueConfiguration> {
    if (configurationId !== (eventConfiguration as IVenueConfiguration).id) {
      throw new ConfigurationNotFound();
    }
    return exampleConfig;
  }
}
