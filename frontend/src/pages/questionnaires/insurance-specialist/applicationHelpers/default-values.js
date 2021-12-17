export function policyholderValue(appDataValid) {
  return {
    policyholder: [
      {
        policyholderIs: appDataValid?.[0]?.policyholderIs || "firm",
        name: appDataValid?.[0]?.name || "",
        surname: appDataValid?.[0]?.surname || "",
        nip: appDataValid?.[0]?.nip || "",
        birthDate: appDataValid?.[0]?.birthDate || null,
        pesel: appDataValid?.[0]?.pesel || "",
        regon: appDataValid?.[0]?.regon || "",
        phoneNumber: appDataValid?.[0]?.phoneNumber || "",
        email: appDataValid?.[0]?.email || "",
        country: appDataValid?.[0]?.country || "",
        city: appDataValid?.[0]?.city || "",
        postIndex: appDataValid?.[0]?.postIndex || "",
        street: appDataValid?.[0]?.street || "",
        houseNumber: appDataValid?.[0]?.houseNumber || "",
      },
    ],
  };
}
