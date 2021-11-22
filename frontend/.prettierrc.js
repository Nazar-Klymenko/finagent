module.exports = {
  importOrder: [
    "^react$",
    "^@utils/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@styles/(.*)$",
    "^@helpers/(.*)$",
    "^@services/(.*)$",
    "^@api/(.*)$",
    "^@hooks/(.*)$",
    "^@context/(.*)$",
    "^@redux/(.*)$",
    "^@components/(.*)$",
    "^[./]",
    "^@pages/(.*)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
