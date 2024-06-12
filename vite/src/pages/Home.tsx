import {
  Flex,
  Grid,
  Box,
  Image,
  Progress,
  Text,
  Button,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import PuzzleCard from "../components/PuzzleCard";

const Home: FC = () => {
  const navigate = useNavigate();
  const [mintedList, setMintedList] = useState<boolean[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const { signer, mintContract } = useOutletContext<OutletContext>();

  const getCheckNfts = async () => {
    try {
      if (!signer || !mintContract) return;

      const response = await mintContract.checkNfts(signer.address);

      const temp = response.map((v: boolean) => v);

      setMintedList(temp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCheckNfts();
  }, [signer, mintContract]);

  useEffect(() => {
    if (mintedList.length === 0) return;

    const temp = mintedList.filter((v) => {
      if (v) {
        return v;
      }
    });

    setProgress((temp.length / mintedList.length) * 100);
  }, [mintedList]);

  return (
    <Flex flexDir="column" w="100%">
      <Flex
        bgColor="blue.300"
        h={[20, 20, 40]}
        justifyContent="center"
        alignItems="center"
        fontSize={[24, 24, 48]}
      >
        바다가 위험해! 구해줘
      </Flex>
      <Button
        variant="outline"
        colorScheme="blue"
        onClick={() => navigate("/mint")}
      >
        구하러가기
      </Button>
      <Flex
        flexGrow={1}
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        {signer ? (
          <>
            <Flex
              w={[320, 320, 640]}
              my={[4, 4, 8]}
              gap={[2, 2, 4]}
              alignItems="center"
            >
              <Text fontSize={[16, 16, 24]}>진행도</Text>
              <Progress hasStripe value={progress} h={[4, 4, 8]} flexGrow={1} />
            </Flex>
            <Grid templateColumns={"repeat(4, 1fr)"}>
              {mintedList.map((v, i) => (
                <PuzzleCard key={i} index={i} isMinted={v} />
              ))}
            </Grid>
          </>
        ) : (
          <Box pos="relative" w={[80, 80, 160]}>
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bgColor="rgba(0,0,0,0.5)"
            />
            <Image src="/images/save_the_sea.webp" alt="Save the SEA" />
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
