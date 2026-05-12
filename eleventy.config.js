import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

const groupByMonth = (values) => {
  const grouped = values.reduce((acc, item) => {
    const displayMonth = item.page.date.toLocaleString("default", {
      month: "long",
    });
    const numericMonth = item.page.date.toLocaleString("default", {
      month: "numeric",
    });

    return [
      ...(acc.filter((group) => group.numericMonth !== numericMonth) || []),
      {
        name: displayMonth,
        numericMonth,
        items: [
          ...(acc.find((group) => group.numericMonth === numericMonth)?.items ||
            []),
          item,
        ],
      },
    ].sort((a, b) => b.numericMonth - a.numericMonth);
  }, []);

  return grouped;
};

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addFilter("groupByMonth", groupByMonth);
}
