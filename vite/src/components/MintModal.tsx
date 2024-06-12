import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface MintModalProps {
  isOpen: boolean;
  onClose: () => void;
  stsNftMetadata: StsNftMetadata | undefined;
}

const MintModal: FC<MintModalProps> = ({ isOpen, onClose, stsNftMetadata }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>바다를 구했습니다!</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDir="column" alignItems="center">
          <Box pos="relative">
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
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="white"
            textColor="black"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintModal;
