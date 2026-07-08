package app.acento.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { AcentoApp() }
    }
}

@Composable
fun AcentoApp() {
    MaterialTheme {
        Scaffold(
            bottomBar = {
                NavigationBar {
                    listOf("Home", "Learn", "Practice", "Dictionary", "Profile").forEach {
                        NavigationBarItem(selected = it == "Home", onClick = {}, icon = {}, label = { Text(it) })
                    }
                }
            }
        ) { padding ->
            Column(
                modifier = Modifier
                    .padding(padding)
                    .padding(24.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text("Acento", style = MaterialTheme.typography.displaySmall)
                Text("Spanish as it is actually spoken.")
                ElevatedCard {
                    Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                        Text("Common Dominican Expressions", style = MaterialTheme.typography.titleLarge)
                        Text("Standard: ¿Qué tal, amigo?")
                        Text("Dominican: ¿Qué lo qué, mano?")
                        Text("Use with friends, not formal contexts.")
                    }
                }
            }
        }
    }
}
