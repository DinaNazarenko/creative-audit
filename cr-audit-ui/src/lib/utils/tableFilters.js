export function tableFilters(creatives, filterSettings) {
    return creatives.filter(creative => {
      const hasStatus = filterSettings.statuses.length > 0 && 
                        filterSettings.statuses.reduce((acc, status) => 
                          acc || creative.status === status, false);
      const hasType = filterSettings.types.length > 0 && 
                      filterSettings.types.reduce((acc, type) => 
                        acc || creative.type === type, false);
      const hasAccount = filterSettings.accounts.length > 0 && 
                        filterSettings.accounts.reduce((acc, account) => 
                          acc || account === creative.account, false);
      const hasAdvertiser = filterSettings.advertisers.length > 0 && 
                            filterSettings.advertisers.reduce((acc, advertiser) => 
                              acc || advertiser === creative.advertiser, false);

      const [startDate, endDate] = filterSettings.dateRange.map(date => new Date(date)); 

      const hasDateRange = filterSettings.dateRange?.length > 0 && 
      new Date(creative.dateStart) >= startDate &&
      new Date(creative.dateStart) <= endDate;

      return (hasStatus || !filterSettings.statuses.length > 0) &&
             (hasType || !filterSettings.types.length > 0) &&
             (hasAccount || !filterSettings.accounts.length > 0) &&
             (hasAdvertiser || !filterSettings.advertisers.length > 0) &&
             (hasDateRange || !filterSettings.dateRange?.length > 0);
    });
  } 
  