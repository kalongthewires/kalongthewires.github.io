import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

// TODO: Handle year

const groupByMonth = (values) => {
  const grouped = values.reduce((acc, item) => {
    const displayMonth = item.page.date.toLocaleString("default", {
      month: "long",
    });
    const date = item.page.date.getTime();

    return [
      ...(acc.filter((group) => group.date !== date) || []),
      {
        name: displayMonth,
        date,
        items: [
          ...(acc.find((group) => group.date === date)?.items || []),
          item,
        ],
      },
    ].sort((a, b) => b.date - a.date);
  }, []);

  return grouped;
};

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addFilter("groupByMonth", groupByMonth);
}
