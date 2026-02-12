export const computeFare = ({
  priceFromPassengerOriginToTripEnd,
  priceFromPassengerDestinationToTripEnd,
}: {
  priceFromPassengerOriginToTripEnd: number;
  priceFromPassengerDestinationToTripEnd: number;
}) => {
  return (
    priceFromPassengerOriginToTripEnd - priceFromPassengerDestinationToTripEnd
  );
};
