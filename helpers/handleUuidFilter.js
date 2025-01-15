const handleUuidFilter = (filterKey, filterValue) => {
    const uuids = [];
    let hasNullValue = false;
  
    filterValue.forEach((item) => {
      if (item.uuid) {
        uuids.push(item.uuid);
      } else {
        hasNullValue = true;
      }
    });
  
    return hasNullValue
      ? {
          $or: [
            { [filterKey]: { uuid: { $in: uuids } } },
            { [filterKey]: { uuid: { $null: true } } },
          ],
        }
      : {
          [filterKey]: { uuid: { $in: uuids } },
        };
};

export default handleUuidFilter;