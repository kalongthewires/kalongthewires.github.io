const groupByMonth = (values) => {
  const grouped = values.reduce((years, value) => {
    const displayMonth = value.page.date.toLocaleString("default", {
      month: "long",
    });
    const month = value.page.date.getMonth();
    const year = value.page.date.getFullYear();

    const existingYear = years.find(
      (existingYear) => existingYear.name === year,
    );
    const existingMonths = existingYear?.months;
    const existingItems = existingMonths?.find(
      (existingMonth) => existingMonth.monthNumeric === month,
    )?.items;

    return [
      ...(years?.filter((existingYear) => existingYear.name !== year) || []),
      {
        name: year,
        months: [
          ...(existingMonths?.filter(
            (existingMonth) => existingMonth.monthNumeric !== month,
          ) || []),
          {
            name: displayMonth,
            monthNumeric: month,
            items: [...(existingItems || []), value],
          },
        ],
      },
    ].sort((a, b) => b.name - a.name);
  }, []);

  return grouped;
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("pixels.css");
  eleventyConfig.addFilter("groupByMonth", groupByMonth);
}
