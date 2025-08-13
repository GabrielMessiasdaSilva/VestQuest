import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function TermsScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets(); // pega a altura segura

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: insets.top + 10,
                    right: 10,
                    zIndex: 10,
                    backgroundColor: '#000',
                    borderRadius: 20,
                    padding: 8,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={20} color="#fff" />
                <Text style={{ color: '#fff', marginLeft: 4 }}>Voltar</Text>
            </TouchableOpacity>

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    padding: 20,
                    paddingTop: insets.top + 60, // espaço extra para não sobrepor o botão
                    backgroundColor: '#fff'
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>{t("termsNConditions.title")}</Text>
                <Text style={styles.lastUpdate}>{t("termsNConditions.last_update")}</Text>
                <Text style={styles.paragraph}>{t("termsNConditions.intro")}</Text>

                {Object.entries(t("termsNConditions.sections", { returnObjects: true })).map(
                    ([key, section]: any) => (
                        <View key={key} style={styles.section}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <Text style={styles.paragraph}>{section.content}</Text>
                        </View>
                    )
                )}

                <Text style={[styles.paragraph, { marginTop: 20 }]}>
                    {t("termsNConditions.sections.acceptance")}
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}