export function useAggregateHour(dates, values) {
    const aggregatedData = {}

    dates.forEach((date, index) => {
      const dateTime = new Date(date)
      const hourKey = dateTime.toISOString().substring(0, 13) + ':00:00Z'
      if (values[index]) {
        if (!aggregatedData[hourKey]) {
          aggregatedData[hourKey] = { total: values[index], count: 1 }
        } else {
  
          aggregatedData[hourKey].total += values[index] 
          aggregatedData[hourKey].count++
        }
      }
    })

    const result = Object.keys(aggregatedData).map((hour) => ({
      date:  new Date(hour).toLocaleTimeString('fr-FR', { timeStyle: 'short'}),
      value: aggregatedData[hour].total / aggregatedData[hour].count,
    }))

    return result
}

export function useAggregateDay(dates, values) {
    const aggregatedData = {};
  
    dates.forEach((date, index) => {
      const dateTime = new Date(date);
      const dayKey = dateTime.toISOString().substring(0, 10);
      if (values[index]) {
        if (!aggregatedData[dayKey]) {
          aggregatedData[dayKey] = { total: values[index], count: 1 };
        } else {
          aggregatedData[dayKey].total += values[index];
          aggregatedData[dayKey].count++;
        }
      }
    });
  
    const result = Object.keys(aggregatedData).map(day => ({
      date:  new Date(day).toLocaleTimeString('fr-FR', { dateStyle: 'short'}),
      value: aggregatedData[day].total / aggregatedData[day].count
    }));
  
    return result;
  }


export function useAggregateMinute(dates, values) {
    const aggregatedData = {};
    
    dates.forEach((date, index) => {
      const dateTime = new Date(date);
      const minuteKey = dateTime.toISOString().substring(0, 16) + ':00Z';
  
      if (values[index]) {
        if (!aggregatedData[minuteKey]) {
          aggregatedData[minuteKey] = { total: values[index], count: 1 };
        } else {
          aggregatedData[minuteKey].total += values[index];
          aggregatedData[minuteKey].count++;
        }
      }
    });

    const result = Object.keys(aggregatedData).map(minute => ({
      date: new Date(minute).toLocaleTimeString('fr-FR', { timeStyle: 'short'}),
      value: aggregatedData[minute].total / aggregatedData[minute].count
    }));
  
    return result;
  }
  