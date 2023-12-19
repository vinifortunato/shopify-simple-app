import { json } from "@remix-run/node";
import type { LoaderFunctionArgs  } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Box,
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const response = await fetch("http://localhost:3000");
    const data = await response.json();
    return json({ ...data });
  } catch (error) {
    console.error(error);
    return json({ sucess: false, message: "request failed" });
  }
};

export default function ExamplePage() {
  const data = useLoaderData<typeof loader>() as any;

  console.log(data);

  return (
    <Page>
      <ui-title-bar title="Example page" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              {data.success ? (
                <Text as="p" variant="bodyMd">
                  Success!!!
                </Text>

              ) : (
                <Text as="p" variant="bodyMd">
                  Fail :/
                </Text>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
