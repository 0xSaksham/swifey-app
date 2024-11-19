import { StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput } from 'react-native'
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { Link } from 'expo-router';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Explore",
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search claims, users, or topics..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Trending Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Topics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicsScroll}>
            {trendingTopics.map((topic, index) => (
              <Pressable key={index} style={styles.topicCard}>
                <Text style={styles.topicText}>{topic}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Featured Claims */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Claims</Text>
          {featuredClaims.map((claim, index) => (
            <Link href={`/user/${claim.userId}`} asChild key={index}>
              <Pressable style={styles.claimCard}>
                <Image source={{ uri: claim.userAvatar }} style={styles.avatar} />
                <View style={styles.claimContent}>
                  <Text style={styles.userName}>{claim.userName}</Text>
                  <Text style={styles.claimType}>{claim.type}</Text>
                  <Text style={styles.claimStatus}>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    {' Verified'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </Pressable>
            </Link>
          ))}
        </View>

        {/* Suggested Users */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Users</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.usersScroll}>
            {suggestedUsers.map((user, index) => (
              <Link href={`/user/${user.id}`} asChild key={index}>
                <Pressable style={styles.userCard}>
                  <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                  <Text style={styles.userCardName}>{user.name}</Text>
                  <Text style={styles.userCardClaims}>{user.claims} claims</Text>
                  <Pressable style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                  </Pressable>
                </Pressable>
              </Link>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

export default Explore

// Sample Data
const trendingTopics = [
  "🎓 Education", "💼 Employment", "🏆 Achievements", "📱 Social Media", "🌟 Skills"
];

const featuredClaims = [
  {
    userId: "user123",
    userName: "Sarah Chen",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    type: "LinkedIn Profile Verification",
  },
  {
    userId: "user456",
    userName: "Alex Rivera",
    userAvatar: "https://i.pravatar.cc/150?img=2",
    type: "GitHub Contributions",
  },
  {
    userId: "user789",
    userName: "Maria Garcia",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    type: "University Degree",
  },
];

const suggestedUsers = [
  {
    id: "user234",
    name: "David Kim",
    avatar: "https://i.pravatar.cc/150?img=4",
    claims: 12,
  },
  {
    id: "user345",
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    claims: 8,
  },
  {
    name: "Michael Brown",
    avatar: "https://i.pravatar.cc/150?img=6",
    claims: 5,
  },
  {
    name: "Sophia Davis",
    avatar: "https://i.pravatar.cc/150?img=7",
    claims: 3,
  },
  {
    name: "James Lee",
    avatar: "https://i.pravatar.cc/150?img=8",
    claims: 2,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  topicsScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  topicCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  topicText: {
    fontSize: 16,
    color: '#fff',
  },
  claimCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  claimContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  claimType: {
    fontSize: 14,
    color: '#666',
  },
  claimStatus: {
    fontSize: 14,
    color: '#666',
  },
  usersScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  userCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  userCardClaims: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  followButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})
