import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

const groupByMonth = (values) => {
  const grouped = values.reduce((years, value) => {
    const date = new Date(value.date);
    const displayMonth = date.toLocaleString("default", {
      month: "long",
    });
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const existingYear = years.find(
      (existingYear) => existingYear.year === year,
    );
    const existingMonths = existingYear?.months;
    const existingItems = existingMonths?.find(
      (existingMonth) => existingMonth.monthNumeric === month,
    )?.items;

    return [
      ...(years?.filter((existingYear) => existingYear.year !== year) || []),
      {
        year,
        months: [
          ...(existingMonths?.filter(
            (existingMonth) => existingMonth.monthNumeric !== month,
          ) || []),
          {
            month: displayMonth,
            monthNumeric: month,
            items: [...(existingItems || []), value],
          },
        ],
      },
    ];
  }, []);

  return grouped
    .map((group) => ({
      ...group,
      months: group.months.sort((a, b) => b.monthNumeric - a.monthNumeric),
    }))
    .map((group) => ({
      ...group,
      months: group.months.map((month) => ({
        ...month,
        items: month.items.sort((a, b) => new Date(a.date) - new Date(b.date)),
      })),
    }))
    .sort((a, b) => b.year - a.year);
};

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("bundle.css");
  eleventyConfig.addPassthroughCopy("pixels.css");

  eleventyConfig.addFilter("postDate", (date) => {
    return date.toLocaleString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  });
  eleventyConfig.addFilter("groupByMonth", groupByMonth);

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "auto"],

    failOnError: false,

    widths: [512, 1024],

    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
    },
  });
}
