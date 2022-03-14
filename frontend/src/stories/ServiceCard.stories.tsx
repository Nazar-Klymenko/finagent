import { Story } from "@storybook/react";

import { ServiceCard } from "@components/ServiceCard";

export default {
  title: "misc/ServiceCard",
  component: ServiceCard,
};

export const Main: Story<{}> = ({ ...props }) => (
  <div style={{ height: 200, width: 340 }}>
    <ServiceCard
      to={config.to}
      image={config.image}
      header={config.header}
      description={config.description}
      {...props}
    />
  </div>
);

const config = {
  to: "survey/insurance-travel/1",
  image: "images/travel_insurance.svg",
  header: "Services.Travel.subtitle",
  description: "Services.Travel.title",
};
