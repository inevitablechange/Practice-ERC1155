import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import axios from "axios";

interface NftCardProps {
  tokenId: number;
  amount: number;
}

const NftCard: FC<NftCardProps> = ({ tokenId, amount }) => {
  const [stsNftMetadata, setStsNftMetadata] = useState<StsNftMetadata>();

  const { mintContract } = useOutletContext<OutletContext>();

  const getNftMetadata = async () => {
    try {
      if (!mintContract || !tokenId) return;

      const response = await axios.get<NftMetadata>(
        `${import.meta.env.VITE_METADATA_URI}/${tokenId}.json`
      );

      setStsNftMetadata({
        ...response.data,
        tokenId,
        amount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, [mintContract, tokenId]);

  return (
    <GridItem display="flex" flexDir="column">
      <Box pos="relative" w="fit-content">
        <Text
          pos="absolute"
          top={2}
          right={2}
          fontWeight="bold"
          backgroundColor="rgba(255,255,255,0.7)"
          px={[2, 2, 4]}
          rounded="full"
        >
          x {stsNftMetadata?.amount}
        </Text>
        <Image
          src={`/images/puzzle/${stsNftMetadata?.tokenId}.png`}
          alt={stsNftMetadata?.name}
        />
      </Box>
      <Text fontWeight="bold">{stsNftMetadata?.name}</Text>
      <Text>{stsNftMetadata?.description}</Text>
    </GridItem>
  );
};

export default NftCard;
