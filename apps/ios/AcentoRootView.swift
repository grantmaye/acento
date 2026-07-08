import SwiftUI

struct AcentoRootView: View {
    var body: some View {
        TabView {
            LessonHomeView()
                .tabItem { Label("Home", systemImage: "house") }
            Text("Learn")
                .tabItem { Label("Learn", systemImage: "book") }
            Text("Practice")
                .tabItem { Label("Practice", systemImage: "waveform") }
            Text("Dictionary")
                .tabItem { Label("Dictionary", systemImage: "magnifyingglass") }
            Text("Profile")
                .tabItem { Label("Profile", systemImage: "person") }
        }
        .tint(.brown)
    }
}

struct LessonHomeView: View {
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    Text("Spanish as it is spoken")
                        .font(.largeTitle.weight(.semibold))
                    LessonCardView()
                    AudioControlView()
                }
                .padding(24)
            }
            .navigationTitle("Acento")
        }
    }
}

struct LessonCardView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("Common Dominican Expressions")
                .font(.title2.weight(.semibold))
            Text("Standard")
                .font(.caption.weight(.medium))
                .foregroundStyle(.secondary)
            Text("¿Qué tal, amigo?")
            Text("Dominican")
                .font(.caption.weight(.medium))
                .foregroundStyle(.brown)
            Text("¿Qué lo qué, mano?")
                .font(.title3.weight(.semibold))
            Text("Use with friends, not formal contexts.")
                .foregroundStyle(.secondary)
        }
        .padding(20)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 16))
    }
}

struct AudioControlView: View {
    var body: some View {
        HStack {
            Button(action: {}) {
                Image(systemName: "play.fill")
            }
            Slider(value: .constant(0.35))
            Button(action: {}) {
                Image(systemName: "mic")
            }
        }
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 14))
    }
}
