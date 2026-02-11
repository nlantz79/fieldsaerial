pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        // CivTAK/ATAK artifacts are typically provided via local maven from SDK installation.
        mavenLocal()
    }
}

rootProject.name = "civtak-uvpro-plugin"
include(":app")
