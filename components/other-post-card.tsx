import { Text, Box, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import type { Post } from "contentlayer/generated";
import { Property } from "csstype";

export default function OtherPostCard({
  post,
  align = "left",
}: {
  post: Post;
  align?: Property.TextAlign;
}) {
  return (
    <Box
      p={6}
      borderRadius="md"
      textAlign={align}
      bg={post ? "whiteAlpha.300" : "whiteAlpha.100"}
      cursor={post ? "pointer" : "default"}
    >
      {post && (
        <NextLink href={`/blog/${post.slug}`} passHref>
          <Box as="a" display="block">
            <Text color="whiteAlpha.500">
              {align === "left" ? "Previous:" : "Next:"}
            </Text>
            <Heading mt={2} as="h4" size="md" fontWeight="semibold">
              {post.title}
            </Heading>
          </Box>
        </NextLink>
      )}
    </Box>
  );
}