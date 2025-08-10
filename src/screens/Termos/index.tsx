import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";

export default function TermsScreen() {
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>

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
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="chevron-back" size={24} color="#fff" />
                <Text style={styles.return}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}